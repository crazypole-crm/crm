<?php
declare(strict_types=1);

namespace App\Training\Domain\Model\Event;

use App\Common\Domain\Event\EventInterface;
use App\Common\Domain\Uuid;

class TrainingsRemovedEvent implements EventInterface
{
    public const TYPE = 'training.trainings_removed';

    /**
     * @param Uuid[] $trainingId
     */
    public function __construct(private array $trainingId)
    {}

    /**
     * @return Uuid[]
     */
    public function getTrainingIds(): array
    {
        return $this->trainingId;
    }

    public function getEventType(): string
    {
        return self::TYPE;
    }
}