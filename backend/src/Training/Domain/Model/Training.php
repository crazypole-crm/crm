<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

class Training
{
    /** @var Uuid */
    private $id;
    /** @var string */
    private $name;
    /** @var string */
    private $description;
    /** @var \DateTimeImmutable */
    private $startDate;
    /** @var \DateTimeImmutable */
    private $endDate;
    /** @var string */
    private $place;
    /** @var Uuid */
    private $organizerId;
    /** @var int|null */
    private $repetitionSchedule;
    /** @var bool */
    private $isRepeatable;

    public function __construct(
        Uuid $id,
        string $name,
        string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        string $place,
        Uuid $organizerId,
        ?int $repetitionSchedule,
        bool $isRepeatable
    )
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->assertEndDateValid($endDate, $startDate);
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->place = $place;
        $this->organizerId = $organizerId;
        $this->repetitionSchedule = $repetitionSchedule;
        $this->isRepeatable = $isRepeatable;
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

    public function getPlace(): string
    {
        return $this->place;
    }

    public function getOrganizerId(): Uuid
    {
        return $this->organizerId;
    }

    public function getRepetitionSchedule(): ?int
    {
        return $this->repetitionSchedule;
    }

    public function isRepeatable(): bool
    {
        return $this->isRepeatable;
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

    private function assertEndDateValid(\DateTimeImmutable $endDate, \DateTimeImmutable $startDate): void
    {
        if ($endDate < $startDate)
        {
            //TODO: добавить кастомное исключение
            throw new \Exception();
        }
    }
}