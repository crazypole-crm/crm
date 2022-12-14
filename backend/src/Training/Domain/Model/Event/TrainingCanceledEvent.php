<?php
declare(strict_types=1);

namespace App\Training\Domain\Model\Event;

use App\Common\Domain\Event\EventInterface;
use App\Common\Domain\Uuid;

class TrainingCanceledEvent implements EventInterface
{
    public const TYPE = 'training.training_canceled';

    public function __construct(private Uuid $trainingId, private string $title)
    {}

    /**
     * @return Uuid
     */
    public function getTrainingId(): Uuid
    {
        return $this->trainingId;
    }

    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    public function getEventType(): string
    {
        return self::TYPE;
    }
}