<?php

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;
use App\Event\Api\Input\EditEventInput;
use App\Event\App\Data\EventData;

interface ApiInterface
{
    public function createEvent(CreateEventInput $input): string;

    public function getEventDataById(string $eventId): ?EventData;

    /**
     * @param string $userId
     * @return EventData[]
     */
    public function getEventsDataByUserId(string $userId): array;

    /**
     * @param EditEventInput $input
     */
    public function editEvent(EditEventInput $input): void;

    /**
     * @param string[] $userIds
     * @param string $eventId
     */
    public function inviteUsers(array $userIds, string $eventId): void;

    public function removeEvent(string $eventId): void;
}