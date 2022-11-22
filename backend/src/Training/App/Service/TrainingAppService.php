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

class TrainingAppService
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

    public function createTraining(string $title, ?string $description, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $hallId, string $courseId, string $trainerId, int $type, bool $isRepeatable): string
    {
        return (string)$this->transaction->execute(
            function () use ($title, $startDate, $endDate, $hallId, $description, $courseId, $trainerId, $type, $isRepeatable): Uuid
            {
                return $this->eventService->createTraining($title, $description, $startDate, $endDate, new Uuid($hallId), new Uuid($courseId), new Uuid($trainerId), $type, $isRepeatable);
            }
        );
    }

    public function editTraining(string $baseTrainingId, string $trainingId, string $title, ?string $description, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $hallId, string $courseId, string $trainerId, int $type): string
    {
        return (string)$this->transaction->execute(
            function () use ($baseTrainingId, $trainingId, $title, $startDate, $endDate, $hallId, $description, $courseId, $trainerId, $type): void
            {
                $this->eventService->editTraining(new Uuid($baseTrainingId), new Uuid($trainingId), $title, $description, $startDate, $endDate, new Uuid($hallId), new Uuid($courseId), new Uuid($trainerId), $type);
            }
        );
    }

    public function removeTraining(string $baseId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getEventLock($baseId)],
            function () use ($baseId)
            {
                $this->eventService->removeTraining($baseId);
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