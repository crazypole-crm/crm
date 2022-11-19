<?php
declare(strict_types=1);

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;
use App\Event\Api\Input\EditEventInput;
use App\Event\App\Data\TrainingData;
use App\Event\App\Query\ListTrainingInput;
use App\Event\App\Query\ListTrainingSpecification;
use App\Event\App\Query\TrainingQueryServiceInterface;
use App\Event\App\Service\EventAppService;
use App\Event\App\Service\UserInvitationAppService;

class Api implements ApiInterface
{
    public function __construct(
        private EventAppService $eventAppService,
        private UserInvitationAppService $invitationService,
        private TrainingQueryServiceInterface $trainingQueryService)
    {}

    public function createEvent(CreateEventInput $input): string
    {
        //TODO: обработка исключений
        return $this->eventAppService->createEvent($input->getTitle(), $input->getStartDate(), $input->getEndDate(), $input->getOrganizerId(), $input->getDescription(), $input->getPlace());
    }

    public function editEvent(EditEventInput $input): void
    {
        //TODO: обработка исключений
        $this->eventAppService->editEvent($input->getEventId(), $input->getTitle(), $input->getStartDate(), $input->getEndDate(), $input->getOrganizerId(), $input->getDescription(), $input->getPlace());
    }

    /**
     * @param string[] $userIds
     * @param string $eventId
     */
    public function inviteUsers(array $userIds, string $eventId): void
    {
        $this->invitationService->createUsersInvitations($userIds, $eventId);
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