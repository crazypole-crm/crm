<?php
declare(strict_types=1);

namespace App\Training\App\Service;

use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;
use App\Common\App\Transaction\TransactionInterface;
use App\Common\Domain\Uuid;
use App\Training\App\Data\TrainingData;
use App\Training\App\Lock\LockNames;
use App\Training\App\Query\TrainingQueryServiceInterface;
use App\Training\App\Query\UserInvitationQueryServiceInterface;
use App\Training\Domain\Service\TrainingService;

class EventAppService
{
    /** @var TrainingService */
    private $eventService;
    /** @var TransactionInterface */
    private $transaction;
    /** @var MultiBlockingOperationExecutorInterface */
    private $blockingOperatorExecutor;

    public function __construct(
        TrainingService $eventService,
        TransactionInterface $transaction,
        MultiBlockingOperationExecutorInterface $blockingOperatorExecutor
    )
    {
        $this->transaction = $transaction;
        $this->eventService = $eventService;
        $this->blockingOperatorExecutor = $blockingOperatorExecutor;
    }

    public function createTraining(string $title, ?string $description, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $hallId, string $courseId, string $trainerId, int $type): string
    {
        return (string)$this->transaction->execute(
            function () use ($title, $startDate, $endDate, $hallId, $description, $courseId, $trainerId, $type): Uuid
            {
                return $this->eventService->createTraining($title, $description, $startDate, $endDate, new Uuid($hallId), new Uuid($courseId), new Uuid($trainerId), $type);
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

    public function createHall(string $title, int $capacity): string
    {
        return (string)$this->transaction->execute(
            function () use ($title, $capacity): Uuid
            {
                return $this->eventService->createHall($title, $capacity);
            }
        );
    }

    public function createCourse(string $title): string
    {
        return (string)$this->transaction->execute(
            function () use ($title): Uuid
            {
                return $this->eventService->createCourse($title);
            }
        );
    }
}