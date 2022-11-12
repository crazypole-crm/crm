<?php
declare(strict_types=1);

namespace App\Event\Domain\Exception;

class EventNotFoundException extends \Exception
{
    public function __construct(string $eventId)
    {
        parent::__construct("Training with id '$eventId' not found");
    }
}