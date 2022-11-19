<?php
declare(strict_types=1);

namespace App\Training\Api;

use App\Training\Api\Input\CreateEventInput;
use App\Training\Api\Input\EditEventInput;
use App\Training\App\Query\ListTrainingInput;
use App\Training\App\Query\ListTrainingSpecification;
use App\Training\App\Query\TrainingQueryServiceInterface;
use App\Training\App\Service\EventAppService;
use App\Training\App\Service\UserInvitationAppService;

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