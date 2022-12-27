<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;
use App\Training\Domain\Exception\InvalidMaxRegistrationsException;

class Training
{
    private string $baseId;
    private string $id;
    private string $name;
    private ?string $description;
    private \DateTimeImmutable $startDate;
    private \DateTimeImmutable $endDate;
    private string $hallId;
    private string $courseId;
    private string $trainerId;
    private int $type;
    private bool $isCanceled = false;
    private int $maxRegistrations;

    public function __construct(
        Uuid $baseTrainingId,
        Uuid $id,
        string $name,
        ?string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        Uuid $hallId,
        Uuid $courseId,
        Uuid $trainerId,
        int $type,
        ?int $maxRegistrations
    )
    {
        $this->baseId = (string)$baseTrainingId;
        $this->id = (string)$id;
        $this->name = $name;
        $this->description = $description;
        $this->assertEndDateValid($endDate, $startDate);
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

    public function getBaseId(): Uuid
    {
        return New Uuid($this->baseId);
    }

    public function setBaseId(Uuid $baseId): void
    {
        $this->baseId = (string)$baseId;
    }

    public function getId(): Uuid
    {
        return New Uuid($this->id);
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
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

    public function getHallId(): Uuid
    {
        return New Uuid($this->hallId);
    }

    public function getCourseId(): Uuid
    {
        return New Uuid($this->courseId);
    }

    public function getTrainerId(): Uuid
    {
        return New Uuid($this->trainerId);
    }

    public function setId(Uuid $id): void
    {
        $this->id = (string)$id;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function setStartDate(\DateTimeImmutable $startDate): void
    {
        $this->startDate = $startDate;
    }

    public function setEndDate(\DateTimeImmutable $endDate): void
    {
        $this->endDate = $endDate;
    }

    public function getType(): int
    {
        return $this->type;
    }

    public function setHallId(Uuid $hallId): void
    {
        $this->hallId = (string)$hallId;
    }

    public function setCourseId(Uuid $courseId): void
    {
        $this->courseId = (string)$courseId;
    }

    public function setTrainerId(Uuid $trainerId): void
    {
        $this->trainerId = (string)$trainerId;
    }

    public function setType(int $type): void
    {
        $this->type = $type;
    }

    public function isCanceled(): bool
    {
        return $this->isCanceled;
    }

    public function setIsCanceled(bool $isCanceled): void
    {
        $this->isCanceled = $isCanceled;
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

    private function assertEndDateValid(\DateTimeImmutable $endDate, \DateTimeImmutable $startDate): void
    {
        if ($endDate < $startDate)
        {
            //TODO: добавить кастомное исключение
            throw new \Exception();
        }
    }
}