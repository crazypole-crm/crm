<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

class Training
{
    private Uuid $id;
    private string $name;
    private string $description;
    private \DateTimeImmutable $startDate;
    private \DateTimeImmutable $endDate;
    private Uuid $hallId;
    private Uuid $courseId;
    private Uuid $trainerId;
    private int $type;

    public function __construct(
        Uuid $id,
        string $name,
        string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        Uuid $hallId,
        Uuid $courseId,
        Uuid $trainerId,
        int $type,
    )
    {
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

    public function setPlace(string $place): void
    {
        $this->place = $place;
    }

    public function setOrganizerId(Uuid $organizerId): void
    {
        $this->organizerId = $organizerId;
    }

    public function getType(): int
    {
        return $this->type;
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