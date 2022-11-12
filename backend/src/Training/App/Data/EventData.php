<?php
declare(strict_types=1);

namespace App\Event\App\Data;

class EventData implements \JsonSerializable
{
    /** @var string */
    private $eventId;
    /** @var string */
    private $title;
    /** @var string|null */
    private $description;
    /** @var \DateTimeImmutable */
    private $startDate;
    /** @var \DateTimeImmutable */
    private $endDate;
    /** @var string */
    private $organizerId;
    /** @var string */
    private $place;
    /** @var string[]|null */
    private $invitedUserIds;

    public function __construct(string $eventId, string $title, ?string $description, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, string $organizerId, string $place)
    {
        $this->eventId = $eventId;
        $this->title = $title;
        $this->description = $description;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->organizerId = $organizerId;
        $this->place = $place;
    }

    public function getEventId(): string
    {
        return $this->eventId;
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

    public function getOrganizerId(): string
    {
        return $this->organizerId;
    }

    public function getPlace(): string
    {
        return $this->place;
    }

    /**
     * @return string[]
     */
    public function getInvitedUserIds(): array
    {
        return $this->invitedUserIds;
    }

    /**
     * @param string[]|null $invitedUserIds
     */
    public function setInvitedUserIds(?array $invitedUserIds): void
    {
        $this->invitedUserIds = $invitedUserIds;
    }

    public function jsonSerialize()
    {
        return [
            'eventId' => $this->eventId,
            'title' => $this->title,
            'description' => $this->description,
            'startDate' => $this->startDate->getTimestamp(),
            'endDate' => $this->endDate->getTimestamp(),
            'organizerId' => $this->organizerId,
            'place' => $this->place,
            'invitedUserIds' => $this->invitedUserIds,
        ];
    }
}