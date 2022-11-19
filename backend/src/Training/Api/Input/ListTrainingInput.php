<?php
declare(strict_types=1);

namespace App\Training\App\Query;

class ListTrainingInput
{
    public function __construct(
        private \DateTimeImmutable $startDate,
        private \DateTimeImmutable $endDate,
        private array $trainingIds,
    ){}

    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    public function getEndDate(): \DateTimeImmutable
    {
        return $this->endDate;
    }

    /**
     * @return string[]
     */
    public function getTrainingIds(): array
    {
        return $this->trainingIds;
    }
}