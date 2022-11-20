<?php
declare(strict_types=1);

namespace App\Training\Api\Input;

class CreateEventInput
{
    public function __construct(
        private string $title,
        private ?string $description,
        private \DateTimeImmutable $startDate,
        private \DateTimeImmutable $endDate,
        private string $hallId,
        private string $courseId,
        private string $trainerId,
        private int $type,
    ){}

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getEndDate(): \DateTimeImmutable
    {
        return $this->endDate;
    }

    /**
     * @return string
     */
    public function getHallId(): string
    {
        return $this->hallId;
    }

    /**
     * @return string
     */
    public function getCourseId(): string
    {
        return $this->courseId;
    }

    /**
     * @return string
     */
    public function getTrainerId(): string
    {
        return $this->trainerId;
    }

    /**
     * @return int
     */
    public function getType(): int
    {
        return $this->type;
    }
}