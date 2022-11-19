<?php
declare(strict_types=1);

namespace App\Event\App\Query;

class ListTrainingSpecification
{
    public function __construct(
        private \DateTimeImmutable $startDate,
        private \DateTimeImmutable $endDate,
        private array $eventIds,
    ){}

    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    public function getEndDate(): \DateTimeImmutable
    {
        return $this->endDate;
    }

    public function getEventIds(): array
    {
        return $this->eventIds;
    }
}