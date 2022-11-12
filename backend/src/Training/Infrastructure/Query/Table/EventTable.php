<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class EventTable
{
    public const EVENT_ID = 'event_id';
    public const TITLE = 'name';
    public const DESCRIPTION = 'description';
    public const START_DATE = 'start_date';
    public const END_DATE = 'end_date';
    public const ORGANIZER_ID = 'organizer_id';
    public const PLACE = 'place';

    public const EVENT_FIELDS = [
        self::EVENT_ID => TypeConverter::STRING,
        self::TITLE => TypeConverter::STRING,
        self::DESCRIPTION => TypeConverter::STRING,
        self::START_DATE => TypeConverter::DATE_TIME,
        self::END_DATE => TypeConverter::DATE_TIME,
        self::ORGANIZER_ID => TypeConverter::STRING,
        self::PLACE => TypeConverter::STRING,
    ];
}