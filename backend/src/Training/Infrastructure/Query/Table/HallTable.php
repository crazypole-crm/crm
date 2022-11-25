<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class HallTable
{
    public const HALL_ID = 'id';
    public const TITLE = 'name';
    public const CAPACITY = 'capability';

    public const EVENT_FIELDS = [
        self::HALL_ID => TypeConverter::STRING,
        self::TITLE => TypeConverter::STRING,
        self::CAPACITY => TypeConverter::INTEGER,
    ];
}