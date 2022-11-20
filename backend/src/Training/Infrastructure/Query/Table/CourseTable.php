<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class CourseTable
{
    public const COURSE_ID = 'id';
    public const TITLE = 'name';

    public const EVENT_FIELDS = [
        self::COURSE_ID => TypeConverter::STRING,
        self::TITLE => TypeConverter::STRING,
    ];
}