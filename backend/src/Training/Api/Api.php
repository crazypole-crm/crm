<?php
declare(strict_types=1);

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;
use App\Event\Api\Input\EditEventInput;
use App\Event\App\Data\EventData;
use App\Event\App\Service\EventAppService;
use App\Event\App\Service\UserInvitationAppService;

class Api implements ApiInterface
{
    /** @var EventAppService */
    private $eventAppService;
    /** @var UserInvitationAppService */
    private $invitationService;

    public function __construct(EventAppService $appService, UserInvitationAppService $invitationService)
    {
        $this->eventAppService = $appService;
        $this->invitationService = $invitationService;
    }

    public function createEvent(CreateEventInput $input): string
    {
        //TODO: обработка исключений
        return $this->eventAppService->createEvent($input->getTitle(), $input->getStartDate(), $input->getEndDate(), $input->getOrganizerId(), $input->getDescription(), $input->getPlace());
    }

    public function getEventDataById(string $eventId): ?EventData
    {
        return $this->eventAppService->getEventData($eventId);
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

    public function getEventsDataByUserId(string $userId): array
    {
        return $this->eventAppService->getUserEvents($userId);
    }

}