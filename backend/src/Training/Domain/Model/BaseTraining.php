<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;
use App\Training\Domain\Exception\InvalidMaxRegistrationsException;

class BaseTraining
{
    private string $id;
    private \DateTimeImmutable $startDate;
    private \DateTimeImmutable $endDate;
    private string $hallId;
    private string $courseId;
    private string $trainerId;
    private int $type;
    private int $maxRegistrations;

    public function __construct(
        Uuid $id,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        Uuid $hallId,
        Uuid $courseId,
        Uuid $trainerId,
        int $type,
        ?int $maxRegistrations
    )
    {
        $this->id = (string)$id;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->hallId = (string)$hallId;
        $this->courseId = (string)$courseId;
        $this->trainerId = (string)$trainerId;
        $this->type = $type;
        if ($type === TrainingType::INDIVIDUAL_TRAINING)
        {
            if ($maxRegistrations !== null)
            {
                throw new InvalidMaxRegistrationsException($maxRegistrations);
            }

            $this->maxRegistrations = 1;
        }
        else 
        {
            $this->maxRegistrations = $maxRegistrations;
        }
    }

    /**
     * @return Uuid
     */
    public function getId(): Uuid
    {
        return new Uuid($this->id);
    }

    /**
     * @param Uuid $id
     */
    public function setId(Uuid $id): void
    {
        $this->id = (string)$id;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    /**
     * @param \DateTimeImmutable $startDate
     */
    public function setStartDate(\DateTimeImmutable $startDate): void
    {
        $this->startDate = $startDate;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getEndDate(): \DateTimeImmutable
    {
        return $this->endDate;
    }

    /**
     * @param \DateTimeImmutable $endDate
     */
    public function setEndDate(\DateTimeImmutable $endDate): void
    {
        $this->endDate = $endDate;
    }

    /**
     * @return Uuid
     */
    public function getTrainerId(): Uuid
    {
        return new Uuid($this->trainerId);
    }

    /**
     * @param Uuid $trainerId
     */
    public function setTrainerId(Uuid $trainerId): void
    {
        $this->trainerId = (string)$trainerId;
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
     * @return int
     */
    public function getType(): int
    {
        return $this->type;
    }

    /**
     * @param Uuid $hallId
     */
    public function setHallId(Uuid $hallId): void
    {
        $this->hallId = (string)$hallId;
    }

    /**
     * @param Uuid $courseId
     */
    public function setCourseId(Uuid $courseId): void
    {
        $this->courseId = (string)$courseId;
    }

    /**
     * @param int $type
     */
    public function setType(int $type): void
    {
        $this->type = $type;
    }

    public function getMaxRegistrations(): int
    {
        return $this->maxRegistrations;
    }

    public function setMaxRegistrations(int $maxRegistrations): void
    {
        if ($this->type === TrainingType::INDIVIDUAL_TRAINING && $maxRegistrations !== 1)
        {
            throw new InvalidMaxRegistrationsException($maxRegistrations);
        }
        $this->maxRegistrations = $maxRegistrations;
    }
}