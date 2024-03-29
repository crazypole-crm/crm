<?php
declare(strict_types=1);

namespace App\Training\App\Data;

use App\Training\Domain\Model\TrainingType;

class TrainingData implements \JsonSerializable
{
    public function __construct(
        private string $baseTrainingId,
        private string $trainingId,
        private string $title,
        private ?string $description,
        private \DateTimeImmutable $startDate,
        private \DateTimeImmutable $endDate,
        private string $trainerId,
        private string $hallId,
        private string $courseId,
        private int $type,
        private bool $isCanceled,
        private bool $isTrainerChanged,
        private bool $isMoved,
        private int $maxRegistrations
    ){}

    public function getBaseTrainingId(): string
    {
        return $this->baseTrainingId;
    }

    public function getTrainingId(): string
    {
        return $this->trainingId;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    public function getEndDate(): \DateTimeImmutable
    {
        return $this->endDate;
    }

    public function getTrainerId(): string
    {
        return $this->trainerId;
    }

    public function getHallId(): string
    {
        return $this->hallId;
    }

    public function getCourseId(): string
    {
        return $this->courseId;
    }

    public function getType(): int
    {
        return $this->type;
    }

    public function isCanceled(): bool
    {
        return $this->isCanceled;
    }

    public function isMoved(): bool
    {
        return $this->isMoved;
    }

    public function isTrainerChanged(): bool
    {
        return $this->isTrainerChanged;
    }

    public function getMaxRegistrations(): int
    {
        return $this->maxRegistrations;
    }

    public function jsonSerialize()
    {
        return [
            'baseTrainingId' => $this->baseTrainingId,
            'trainingId' => $this->trainingId,
            'title' => $this->title,
            'description' => $this->description,
            'startDate' => $this->startDate->getTimestamp(),
            'endDate' => $this->endDate->getTimestamp(),
            'trainerId' => $this->trainerId,
            'hallId' => $this->hallId,
            'courseId' => $this->courseId,
            'type' => $this->convertTrainingType($this->type),
            'isCanceled' => $this->isCanceled,
            'isMoved' => $this->isMoved,
            'isTrainerChanged' => $this->isTrainerChanged,
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