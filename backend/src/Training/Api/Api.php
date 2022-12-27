<?php
declare(strict_types=1);

namespace App\Training\Api;

use App\Common\Domain\Uuid;
use App\Training\Api\Input\CreateTrainingInput;
use App\Training\Api\Input\EditTrainingInput;
use App\Training\App\Lock\LockNames;
use App\Training\App\Query\ListTrainingInput;
use App\Training\App\Query\ListTrainingSpecification;
use App\Training\App\Query\TrainingQueryServiceInterface;
use App\Training\App\Service\TrainingAppService;

class Api implements ApiInterface
{
    public function __construct(
        private TrainingAppService $trainingAppService,
        private TrainingQueryServiceInterface $trainingQueryService,
    )
    {}

    public function createTraining(CreateTrainingInput $input): string
    {
        //TODO: обработка исключений
        return $this->trainingAppService->createTraining(
            $input->getTitle(),
            $input->getDescription(), 
            $input->getStartDate(), 
            $input->getEndDate(), 
            $input->getHallId(), 
            $input->getCourseId(), 
            $input->getTrainerId(), 
            $input->getType(), 
            $input->isRepeatable(),
            $input->getMaxRegistrations()
        );
    }

    public function editTraining(EditTrainingInput $input): void
    {
        //TODO: обработка исключений
        $this->trainingAppService->editTraining(
            $input->getBaseId(), 
            $input->getTitle(), 
            $input->getDescription(), 
            $input->getStartDate(), 
            $input->getEndDate(), 
            $input->getHallId(), 
            $input->getCourseId(), 
            $input->getTrainerId(), 
            $input->getMaxRegistrations()
        );
    }

    public function changeTrainingTrainer(string $trainingId, string $trainerId): void
    {
        $this->trainingAppService->changeTrainingTrainer($trainingId, $trainerId);
    }

    public function changeTrainingTime(string $trainingId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate): void
    {
        $this->trainingAppService->changeTrainingTime($trainingId, $startDate, $endDate);
    }

    public function changeTrainingStatus(string $trainingId, bool $isCanceled): void
    {
        $this->trainingAppService->changeTrainingStatus($trainingId, $isCanceled);
    }

    public function removeTrainingsByBase(string $baseId): void
    {
        //TODO: обработка исключений
        $this->trainingAppService->removeTrainingsByBaseTraining($baseId);
    }

    public function removeTraining(string $trainingId): void
    {
        $this->trainingAppService->removeTraining($trainingId);
    }

    public function removeHalls(array $hallIds): void
    {
        $this->trainingAppService->removeHalls($hallIds);
    }

    public function removeCourses(array $courseIds): void
    {
        $this->trainingAppService->removeCourses($courseIds);
    }

    public function editHall(string $id, string $name, int $capacity): void
    {
        $this->trainingAppService->editHall($id, $name, $capacity);
    }

    public function editCourse(string $id, string $name): void
    {
        $this->trainingAppService->editCourse($id, $name);
    }

    public function listTrainings(ListTrainingInput $input): array
    {
        return $this->trainingQueryService->listTrainings(
            new ListTrainingSpecification(
                $input->getStartDate(),
                $input->getEndDate(),
                $input->getTrainingIds(),
            )
        );
    }

    public function listCourses(): array
    {
        return $this->trainingQueryService->listCourses();
    }

    public function createHall(string $name, int $capacity): string
    {
        return $this->trainingAppService->createHall($name, $capacity);
    }

    public function listHalls(): array
    {
        return $this->trainingQueryService->listHalls();
    }

    public function createCourse(string $name): string
    {
        return $this->trainingAppService->createCourse($name);
    }

    public function createRegistration(string $trainingId, string $userId): string
    {
        return $this->trainingAppService->createRegistration($trainingId, $userId);
    }

    public function changeRegistrationStatus(string $registrationId, int $status): void
    {
        $this->trainingAppService->changeRegistrationStatus($registrationId, $status);
    }

    public function removeRegistration(string $registrationId): void
    {
        $this->trainingAppService->removeRegistration($registrationId);
    }
}