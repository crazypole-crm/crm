<?php
declare(strict_types=1);

namespace App\Common\Domain\Event;

interface EventDispatcherInterface
{
    public function dispatch(EventInterface $event): void;
}