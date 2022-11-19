<?php

namespace App\Event\Api;

use App\Event\Api\Input\CreateEventInput;
use App\Event\Api\Input\EditEventInput;
use App\Event\App\Data\TrainingData;
use App\Event\App\Query\ListTrainingInput;

interface ApiInterface
{
    public function createEvent(CreateEventInput $input): string;

    public function getEventDataById(string $eventId): ?TrainingData;

    /**
     * @param string $userId
     * @return TrainingData[]
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

    public function listTraining(ListTrainingInput $input): array;
}