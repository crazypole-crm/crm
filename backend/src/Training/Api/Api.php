<?php
declare(strict_types=1);

namespace App\Training\Api;

use App\Training\Api\Input\CreateTrainingInput;
use App\Training\Api\Input\EditTrainingInput;
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
        return $this->trainingAppService->createTraining($input->getTitle(), $input->getDescription(), $input->getStartDate(), $input->getEndDate(), $input->getHallId(), $input->getCourseId(), $input->getTrainerId(), $input->getType(), $input->isRepeatable());
    }

    public function editTraining(EditTrainingInput $input): void
    {
        //TODO: обработка исключений
        $this->trainingAppService->editTraining($input->getBaseId(), $input->getTrainerId(), $input->getTitle(), $input->getDescription(), $input->getStartDate(), $input->getEndDate(), $input->getHallId(), $input->getCourseId(), $input->getTrainerId(), $input->getType());
    }

    public function removeTraining(string $baseId): void
    {
        //TODO: обработка исключений
        $this->trainingAppService->removeTraining($baseId);
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
}