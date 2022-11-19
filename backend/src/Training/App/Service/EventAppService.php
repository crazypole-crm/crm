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
    /** @var TransactionInterface */
    private $transaction;
    /** @var MultiBlockingOperationExecutorInterface */
    private $blockingOperatorExecutor;

    public function __construct(
        EventService $eventService,
        TransactionInterface $transaction,
        MultiBlockingOperationExecutorInterface $blockingOperatorExecutor
    )
    {
        $this->transaction = $transaction;
        $this->eventService = $eventService;
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
}