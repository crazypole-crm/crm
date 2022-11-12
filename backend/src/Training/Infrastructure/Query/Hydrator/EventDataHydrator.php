<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\Event\App\Data\EventData;
use App\Event\Infrastructure\Query\Table\EventTable;

class EventDataHydrator
{
    public function hydrateRow(array $data): EventData
    {
        $eventId = TypeConverter::hydrateValue($data[EventTable::EVENT_ID], EventTable::EVENT_FIELDS[EventTable::EVENT_ID]);
        $title = TypeConverter::hydrateValue($data[EventTable::TITLE], EventTable::EVENT_FIELDS[EventTable::TITLE]);
        $description = TypeConverter::hydrateValue($data[EventTable::DESCRIPTION], EventTable::EVENT_FIELDS[EventTable::DESCRIPTION]);
        $startDate = TypeConverter::hydrateValue($data[EventTable::START_DATE], EventTable::EVENT_FIELDS[EventTable::START_DATE]);
        $endDate = TypeConverter::hydrateValue($data[EventTable::END_DATE], EventTable::EVENT_FIELDS[EventTable::END_DATE]);
        $organizerId = TypeConverter::hydrateValue($data[EventTable::ORGANIZER_ID], EventTable::EVENT_FIELDS[EventTable::ORGANIZER_ID]);
        $place = TypeConverter::hydrateValue($data[EventTable::PLACE], EventTable::EVENT_FIELDS[EventTable::PLACE]);
        $invitedUser = TypeConverter::hydrateValue($data[EventTable::PLACE], EventTable::EVENT_FIELDS[EventTable::PLACE]);
        return new EventData($eventId, $title, $description, $startDate, $endDate, $organizerId, $place);
    }
}