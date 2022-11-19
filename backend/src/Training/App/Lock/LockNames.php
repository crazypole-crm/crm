<?php
declare(strict_types=1);

namespace App\Training\App\Lock;

class LockNames
{
    private const EVENT_ID_LOCK_NAME = 'event_lock_';

    public static function getEventLock(string $eventId): string
    {
        return self::EVENT_ID_LOCK_NAME . $eventId;
    }
}