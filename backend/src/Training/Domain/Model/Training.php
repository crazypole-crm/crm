<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

class Training
{
    private Uuid $baseTrainingId;
    private Uuid $id;
    private string $name;
    private ?string $description;
    private \DateTimeImmutable $startDate;
    private \DateTimeImmutable $endDate;
    private Uuid $hallId;
    private Uuid $courseId;
    private Uuid $trainerId;
    private int $type;
    private boolean $isCanceled = false;

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
    )
    {
        $this->baseTrainingId = $baseTrainingId;
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->assertEndDateValid($endDate, $startDate);
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->hallId = $hallId;
        $this->courseId = $courseId;
        $this->trainerId = $trainerId;
        $this->type = $type;
    }

    public function getBaseTrainingId(): Uuid
    {
        return $this->baseTrainingId;
    }

    public function setBaseTrainingId(Uuid $baseTrainingId): void
    {
        $this->baseTrainingId = $baseTrainingId;
    }

    public function getId(): Uuid
    {
        return $this->id;
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
        return $this->hallId;
    }

    public function getCourseId(): Uuid
    {
        return $this->courseId;
    }

    public function getTrainerId(): Uuid
    {
        return $this->trainerId;
    }

    public function setId(Uuid $id): void
    {
        $this->id = $id;
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
        $this->hallId = $hallId;
    }

    public function setCourseId(Uuid $courseId): void
    {
        $this->courseId = $courseId;
    }

    public function setTrainerId(Uuid $trainerId): void
    {
        $this->trainerId = $trainerId;
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

    private function assertEndDateValid(\DateTimeImmutable $endDate, \DateTimeImmutable $startDate): void
    {
        if ($endDate < $startDate)
        {
            //TODO: добавить кастомное исключение
            throw new \Exception();
        }
    }
}