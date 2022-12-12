<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Event;

use App\Common\Domain\Event\EventDispatcherInterface;
use App\Common\Domain\Event\EventInterface;
use Symfony\Component\Messenger\MessageBusInterface;

class EventSender implements EventDispatcherInterface
{
    public function __construct(private MessageBusInterface $bus)
    {}

    public function dispatch(EventInterface $event): void
    {
        $this->bus->dispatch($event);
    }
}