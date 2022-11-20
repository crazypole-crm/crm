<?php

namespace App\Training\Api;

use App\Training\Api\Input\CreateEventInput;
use App\Training\Api\Input\EditEventInput;
use App\Training\App\Data\TrainingData;
use App\Training\App\Query\ListTrainingInput;

interface ApiInterface
{
    public function createEvent(CreateEventInput $input): string;

    /**
     * @param EditEventInput $input
     */
    public function editEvent(EditEventInput $input): void;

    public function removeEvent(string $eventId): void;

    public function listTrainings(ListTrainingInput $input): array;

    public function createHall(string $name, int $capacity): string;
}