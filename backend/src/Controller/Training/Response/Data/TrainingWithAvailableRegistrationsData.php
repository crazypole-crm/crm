<?php
declare(strict_types=1);

namespace App\Controller\Training\Response\Data;

use App\Training\Api\Data\TrainingType;
use App\Training\App\Data\TrainingData;

class TrainingWithAvailableRegistrationsData implements \JsonSerializable
{
    public function __construct(
        private TrainingData $training,
        private int $availableRegistrationsCount)
    {
    }

    public function jsonSerialize()
    {
        return [
            'baseTrainingId' => $this->training->getBaseTrainingId(),
            'trainingId' => $this->training->getTrainingId(),
            'title' => $this->training->getTitle(),
            'description' => $this->training->getDescription(),
            'startDate' => $this->training->getStartDate()->getTimestamp(),
            'endDate' => $this->training->getEndDate()->getTimestamp(),
            'trainerId' => $this->training->getTrainerId(),
            'hallId' => $this->training->getHallId(),
            'courseId' => $this->training->getCourseId(),
            'type' => $this->convertTrainingType($this->training->getType()),
            'isCanceled' => $this->training->isCanceled(),
            'isMoved' => $this->training->isMoved(),
            'isTrainerChanged' => $this->training->isTrainerChanged(),
            'maxRegistrationsCount' => $this->training->getMaxRegistrations(),
            'availableRegistrationsCount' => $this->availableRegistrationsCount
        ];
    }

    private function convertTrainingType(int $type): string
    {
        return match ($type)
        {
            TrainingType::GROUP_TRAINING => 'group',
            TrainingType::INDIVIDUAL_TRAINING => 'individual',
            default => '',
        };
    }
}