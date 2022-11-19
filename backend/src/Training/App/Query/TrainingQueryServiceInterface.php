<?php
declare(strict_types=1);

namespace App\Training\App\Query;

use App\Training\App\Data\TrainingData;

interface TrainingQueryServiceInterface
{
    public function getEventData(string $eventId): ?TrainingData;

    /**
     * @param string $userId
     * @return TrainingData[]
     */
    public function getUserTrainings(string $userId): array;

    /**
     * @param ListTrainingSpecification $spec
     * @return TrainingData[]
     */
    public function listTrainings(ListTrainingSpecification $spec): array;
}