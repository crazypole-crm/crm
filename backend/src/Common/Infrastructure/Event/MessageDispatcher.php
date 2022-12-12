<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Event;

use App\Common\App\Event\EventHandlerInterface;
use App\Common\Domain\Event\EventInterface;
use App\Common\Domain\Event\MessageDispatcherInterface;

class MessageDispatcher implements MessageDispatcherInterface
{
    /** @var EventHandlerInterface[] */
    private $handlers;

    public function __construct()
    {
        $this->handlers = [];
    }

    /**
     * @throws \BadMethodCallException
     */
    public function __clone()
    {
        throw new \BadMethodCallException('Clone is not supported');
    }

    /**
     * @param EventInterface $event
     */
    public function dispatch(EventInterface $event): void
    {
        foreach ($this->handlers as $handler)
        {
            if ($handler->isSubscribedTo($event->getEventType()))
            {
                $handler->handleMessage($event);
            }
        }
    }

    public function subscribe(EventHandlerInterface $eventHandler): void
    {
        $this->handlers[] = $eventHandler;
    }
}