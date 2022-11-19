<?php
declare(strict_types=1);

namespace App\Controller\Event\Request;

class CreateEventRequest
{
    /** @var string */
    private $eventId;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $description;

    /**
     * @var \DateTimeImmutable
     */
    private $startDate;

    /**
     * @var \DateTimeImmutable
     */
    private $endDate;

    /**
     * @var string
     */
    private $organizerId;

    /**
     * @var string
     */
    private $place;

    /**
     * @var array
     */
    private $invitedUserIds;

    public function __construct(
        string $eventId,
        string $title,
        string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        string $organizerId,
        string $place,
        array $invitedUserIds
    )
    {
        $this->title = $title;
        $this->eventId = $eventId;
        $this->description = $description;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->organizerId = $organizerId;
        $this->place = $place;
        $this->invitedUserIds = $invitedUserIds;
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

    /**
     * @return array
     */
    public function getInvitedUserIds(): array
    {
        return $this->invitedUserIds;
    }
}