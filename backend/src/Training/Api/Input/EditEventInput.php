<?php
declare(strict_types=1);

namespace App\Event\Api\Input;

class EditEventInput
{
    /** @var string */
    private $eventId;
    /** @var string */
    private $title;
    /** @var string */
    private $description;
    /** @var \DateTimeImmutable */
    private $startDate;
    /** @var \DateTimeImmutable */
    private $endDate;
    /** @var string */
    private $organizerId;
    /** @var string */
    private $place;

    public function __construct(
        string $eventId,
        string $title,
        string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        string $organizerId,
        string $place
    )
    {
        $this->eventId = $eventId;
        $this->title = $title;
        $this->description = $description;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->organizerId = $organizerId;
        $this->place = $place;
    }

    /**
     * @return string
     */
    public function getEventId(): string
    {
        return $this->eventId;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return string
     */
    public function getDescription(): string
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
    public function getOrganizerId(): string
    {
        return $this->organizerId;
    }

    /**
     * @return string
     */
    public function getPlace(): string
    {
        return $this->place;
    }
}