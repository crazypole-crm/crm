<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

class BaseTraining
{
    private string $id;
    private \DateTimeImmutable $startDate;
    private \DateTimeImmutable $endDate;
    private string $trainerId;

    public function __construct(
        Uuid $id,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        Uuid $trainerId,
    )
    {
        $this->id = (string)$id;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->trainerId = (string)$trainerId;
    }

    /**
     * @return Uuid
     */
    public function getId(): Uuid
    {
        return New Uuid($this->id);
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
        return New Uuid($this->trainerId);
    }

    /**
     * @param Uuid $trainerId
     */
    public function setTrainerId(Uuid $trainerId): void
    {
        $this->trainerId = (string)$trainerId;
    }
}