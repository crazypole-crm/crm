<?php
declare(strict_types=1);

namespace App\Event\App\Service;

use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;
use App\Common\App\Transaction\TransactionInterface;
use App\Common\Domain\Uuid;
use App\Event\App\Data\TrainingData;
use App\Event\App\Lock\LockNames;
use App\Event\App\Query\TrainingQueryServiceInterface;
use App\Event\App\Query\UserInvitationQueryServiceInterface;
use App\Event\Domain\Service\EventService;

class EventAppService
{
    /** @var EventService */
    private $eventService;
    /** @var TrainingQueryServiceInterface */
    private $eventQueryService;
    /** @var UserInvitationQueryServiceInterface */
    private $invitationQueryService;
    /** @var TransactionInterface */
    private $transaction;
    /** @var MultiBlockingOperationExecutorInterface */
    private $blockingOperatorExecutor;

    public function __construct(
        TrainingQueryServiceInterface $eventQueryService,
        UserInvitationQueryServiceInterface $invitationQueryService,
        EventService $eventService,
        TransactionInterface $transaction,
        MultiBlockingOperationExecutorInterface $blockingOperatorExecutor
    )
    {
        $this->transaction = $transaction;
        $this->eventService = $eventService;
        $this->invitationQueryService = $invitationQueryService;
        $this->eventQueryService = $eventQueryService;
        $this->blockingOperatorExecutor = $blockingOperatorExecutor;
    }

    public function createEvent(string $title, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $organizerId, ?string $description, ?string $place): string
    {
        return (string)$this->transaction->execute(
            function () use ($title, $startDate, $endDate, $organizerId, $description, $place): Uuid
            {
                return $this->eventService->createTraining($title, $startDate, $endDate, new Uuid($organizerId), $description, $place);
            }
        );
    }

    public function editEvent(string $eventId, string $title, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $organizerId, ?string $description, ?string $place): void
    {
        //Добавить проверку $organizerId
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getEventLock($eventId)],
            function () use ($eventId, $title, $startDate, $endDate, $organizerId, $description, $place)
            {
                $this->eventService->editEvent($eventId, $title, $startDate, $endDate, new Uuid($organizerId), $description, $place);
            }
        );
        $this->transaction->execute($operation);
    }

    public function removeEvent(string $eventId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getEventLock($eventId)],
            function () use ($eventId)
            {
                $this->eventService->removeEvent($eventId);
            }
        );
        $this->transaction->execute($operation);
    }

    public function getEventData(string $eventId): ?TrainingData
    {
        //TODO: если EventData null
        $eventData = $this->eventQueryService->getEventData($eventId);
        if ($eventData === null)
        {
            throw new \RuntimeException("invalid event id {'$eventId'}");
        }
        $invitedUsersMap = $this->invitationQueryService->getInvitedUsersByEventIds([$eventData->getTrainingId()]);
        $eventData->setInvitedUserIds($invitedUsersMap[$eventData->getTrainingId()]);
        return $eventData;
    }

    /**
     * @param string $userId
     * @return TrainingData[]
     */
    public function getUserEvents(string $userId): array
    {
        $eventsData = $this->eventQueryService->getUserTrainings($userId);
        $eventIds = array_map(
            static function (TrainingData $eventData): string
            {
                return $eventData->getTrainingId();
            },
            $eventsData
        );
        $invitedUsersMap = $this->invitationQueryService->getInvitedUsersByEventIds($eventIds);
        foreach ($eventsData as $eventData)
        {
            $eventData->setInvitedUserIds($invitedUsersMap[$eventData->getTrainingId()] ?? []);
        }

        return $eventsData;
    }
}