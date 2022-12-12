<?php

namespace App\Common\Domain\Event;

use App\Common\App\Event\EventHandlerInterface;

interface MessageDispatcherInterface
{
    public function dispatch(EventInterface $event): void;

    public function subscribe(EventHandlerInterface $eventHandler): void;
}