<?php
declare(strict_types=1);

namespace App\Training\Api;

use App\Training\Api\Input\CreateEventInput;
use App\Training\Api\Input\EditEventInput;
use App\Training\App\Query\ListTrainingInput;
use App\Training\App\Query\ListTrainingSpecification;
use App\Training\App\Query\TrainingQueryServiceInterface;
use App\Training\App\Service\EventAppService;

class Api implements ApiInterface
{
    public function __construct(
        private EventAppService $eventAppService,
        private TrainingQueryServiceInterface $trainingQueryService,
    )
    {}

    public function createEvent(CreateEventInput $input): string
    {
        //TODO: обработка исключений
        return $this->eventAppService->createTraining($input->getTitle(), $input->getDescription(), $input->getStartDate(), $input->getEndDate(), $input->getHallId(), $input->getCourseId(), $input->getTrainerId(), $input->getType());
    }

    public function editEvent(EditEventInput $input): void
    {
        //TODO: обработка исключений
        $this->eventAppService->editEvent($input->getEventId(), $input->getTitle(), $input->getStartDate(), $input->getEndDate(), $input->getOrganizerId(), $input->getDescription(), $input->getPlace());
    }

    public function removeEvent(string $eventId): void
    {
        //TODO: обработка исключений
        $this->eventAppService->removeEvent($eventId);
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
}