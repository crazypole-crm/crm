<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class TrainingTable
{
    public const TRAINING_ID = 'id';
    public const TITLE = 'name';
    public const DESCRIPTION = 'description';
    public const START_DATE = 'start_date';
    public const END_DATE = 'end_date';
    public const TRAINER_ID = 'trainer_id';
    public const HALL_ID = 'hall_id';
    public const COURSE_ID = 'course_id';
    public const TRAINING_TYPE = 'type';

    public const EVENT_FIELDS = [
        self::TRAINING_ID => TypeConverter::STRING,
        self::TITLE => TypeConverter::STRING,
        self::DESCRIPTION => TypeConverter::STRING,
        self::START_DATE => TypeConverter::DATE_TIME,
        self::END_DATE => TypeConverter::DATE_TIME,
        self::TRAINER_ID => TypeConverter::STRING,
        self::HALL_ID => TypeConverter::STRING,
        self::COURSE_ID => TypeConverter::STRING,
        self::TRAINING_TYPE => TypeConverter::INTEGER,
    ];
}