<?php
declare(strict_types=1);

namespace App\Event\App\Query;

use App\Event\App\Data\TrainingData;

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