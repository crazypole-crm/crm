<?php
declare(strict_types=1);

namespace App\Training\Domain\Model\Event;

use App\Common\Domain\Event\EventInterface;
use App\Common\Domain\Uuid;

class TrainingRescheduledEvent implements EventInterface
{
    public const TYPE = 'training.training_rescheduled';

    public function __construct(private Uuid $trainingId, private string $title, private \DateTimeImmutable $startDate, private \DateTimeImmutable $oldDateTime, private array $userIds)
    {}

    /**
     * @return Uuid
     */
    public function getTrainingId(): Uuid
    {
        return $this->trainingId;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getStartDate(): \DateTimeImmutable
    {
        return $this->startDate;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getOldDateTime(): \DateTimeImmutable
    {
        return $this->oldDateTime;
    }

    public function getUserIds(): array
    {
        return $this->getUserIds();
    }

    public function getEventType(): string
    {
        return self::TYPE;
    }
}