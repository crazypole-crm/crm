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

    public function createTraining(
        string $title, 
        ?string $description, 
        \DateTimeImmutable $startDate, 
        \DateTimeImmutable $endDate, 
        string $hallId, 
        string $courseId, 
        string $trainerId, 
        int $type, 
        bool $isRepeatable,
        ?int $maxRegistrations    
    ): string
    {
        return (string)$this->transaction->execute(
            function () use ($title, $startDate, $endDate, $hallId, $description, $courseId, $trainerId, $type, $isRepeatable, $maxRegistrations): Uuid
            {
                return $this->eventService->createTraining(
                    $title, 
                    $description,
                    $startDate, 
                    $endDate, 
                    new Uuid($hallId), 
                    new Uuid($courseId), 
                    new Uuid($trainerId), 
                    $type, 
                    $isRepeatable,
                    $maxRegistrations
                );
            }
        );
    }

    /**
     * @param string $baseTrainingId
     * @param string $title
     * @param string|null $description
     * @param \DateTimeImmutable $startDate
     * @param \DateTimeImmutable $endDate
     * @param string $hallId
     * @param string $courseId
     * @param string $trainerId
     * @param int $type
     * @return string
     */
    public function editTraining(
        string $baseTrainingId, 
        string $title, 
        ?string $description, 
        \DateTimeImmutable $startDate, 
        \DateTimeImmutable $endDate, 
        string $hallId, 
        string $courseId, 
        string $trainerId, 
        ?int $maxRegistrations
    ): string
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getTrainingLock($baseTrainingId)],
            function () use ($baseTrainingId, $title, $startDate, $endDate, $hallId, $description, $courseId, $trainerId, $maxRegistrations): void
            {
                $this->eventService->editTrainingByBase(
                    new Uuid($baseTrainingId), 
                    $title, 
                    $description, 
                    $startDate, 
                    $endDate, 
                    new Uuid($hallId), 
                    new Uuid($courseId), 
                    new Uuid($trainerId), 
                    $maxRegistrations
                );
            }
        );
        return (string)$this->transaction->execute($operation);
    }

    public function changeTrainingTrainer(string $trainingId, string $trainerId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getTrainingLock($trainingId)],
            function () use ($trainingId, $trainerId): void
            {
                $this->eventService->changeTrainingTrainer(new Uuid($trainingId), new Uuid($trainerId));
            }
        );
        $this->transaction->execute($operation);
    }

    public function changeTrainingTime(string $trainingId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getTrainingLock($trainingId)],
            function () use ($trainingId, $startDate, $endDate): void
            {
                $this->eventService->changeChangeTrainingTime(new Uuid($trainingId), $startDate, $endDate);
            }
        );
        $this->transaction->execute($operation);
    }

    public function changeTrainingStatus(string $trainingId, bool $isCanceled): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getTrainingLock($trainingId)],
            function () use ($trainingId, $isCanceled): void
            {
                $this->eventService->changeTrainingStatus(new Uuid($trainingId), $isCanceled);
            }
        );
        $this->transaction->execute($operation);
    }

    public function removeTrainingsByBaseTraining(string $baseId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getTrainingLock($baseId)],
            function () use ($baseId)
            {
                $this->eventService->removeBaseTraining(new Uuid($baseId));
            }
        );
        $this->transaction->execute($operation);
    }

    public function removeTraining(string $trainingId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getTrainingLock($trainingId)],
            function () use ($trainingId)
            {
                $this->eventService->removeTraining(new Uuid($trainingId));
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

    public function removeHalls(array $hallIds): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            LockNames::getHallLocks($hallIds),
            function () use ($hallIds)
            {
                $this->eventService->removeHalls($this->convertStringsToUuids($hallIds));
            }
        );
        $this->transaction->execute($operation);
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

    public function editHall(string $id, string $name, int $capacity): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getHallLock($id)],
            function () use ($id, $name, $capacity)
            {
                $this->eventService->editHall(new Uuid($id), $name, $capacity);
            }
        );
        $this->transaction->execute($operation);
    }

    public function editCourse(string $id, string $name): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getCourseLock($id)],
            function () use ($id, $name)
            {
                $this->eventService->editCourse(new Uuid($id), $name);
            }
        );
        $this->transaction->execute($operation);
    }

    public function removeCourses(array $courseIds): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            LockNames::getCourseLocks($courseIds),
            function () use ($courseIds)
            {
                $this->eventService->removeCourses($this->convertStringsToUuids($courseIds));
            }
        );
        $this->transaction->execute($operation);
    }

    public function handleTrainerRemoved(Uuid $trainerId): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getTrainerLock((string)$trainerId)],
            function () use ($trainerId)
            {
                $this->eventService->removeTrainingsByTrainer($trainerId);
            }
        );
        $this->transaction->execute($operation);
    }

    public function convertStringsToUuids(array $strings): array
    {
        return array_map(
            static function (string $string): Uuid {
                return new Uuid($string);
            }, $strings
        );
    }

    public function createRegistration(string $trainingId, string $userId): string
    {
        return $this->transaction->execute(function() use ($trainingId, $userId) {
            return (string)$this->eventService->createRegistration(
                new Uuid($trainingId), 
                new Uuid ($userId)
            );
        });
    }

    public function changeRegistrationStatus(string $registrationId, int $status): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getRegistrationLock((string)$registrationId)],
            function () use ($registrationId, $status)
            {
                $this->eventService->changeRegistrationStatus(new Uuid($registrationId), $status);
            }
        );
        $this->transaction->execute($operation);
    }

    public function removeRegistration(string $registrationId): void
    {
        $this->transaction->execute(function() use ($registrationId) {
            $this->eventService->removeRegistration(new Uuid($registrationId));
        });
    }
}