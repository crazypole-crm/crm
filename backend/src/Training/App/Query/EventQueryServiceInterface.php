<?php
declare(strict_types=1);

namespace App\Event\App\Query;

use App\Event\App\Data\EventData;

interface EventQueryServiceInterface
{
    public function getEventData(string $eventId): ?EventData;

    /**
     * @param string $userId
     * @return EventData[]
     */
    public function getUserEvents(string $userId): array;
}