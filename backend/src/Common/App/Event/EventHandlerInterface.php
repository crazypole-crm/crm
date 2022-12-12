<?php
declare(strict_types=1);

namespace App\Common\App\Event;

use App\Common\Domain\Event\EventInterface;

interface EventHandlerInterface
{
    /**
     * @param EventInterface $event
     */
    public function handleMessage(EventInterface $event): void;

    public function isSubscribedTo(string $messageType): bool;
}