<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class TrainingTable
{
    public const BASE_TRAINING_ID = 'base_id';
    public const TRAINING_ID = 'id';
    public const TITLE = 'name';
    public const DESCRIPTION = 'description';
    public const START_DATE = 'start_date';
    public const END_DATE = 'end_date';
    public const TRAINER_ID = 'trainer_id';
    public const HALL_ID = 'hall_id';
    public const COURSE_ID = 'course_id';
    public const TRAINING_TYPE = 'type';
    public const IS_CANCELED = 'is_canceled';
    public const IS_TRAINER_REPLACE = 'is_trainer_replaced';
    public const BASE_TRAINING_START_DATE = 'base_training_start_date';
    public const MAX_REGISTRATIONS = 'max_registrations';

    public const EVENT_FIELDS = [
        self::BASE_TRAINING_ID => TypeConverter::STRING,
        self::TRAINING_ID => TypeConverter::STRING,
        self::TITLE => TypeConverter::STRING,
        self::DESCRIPTION => TypeConverter::STRING,
        self::START_DATE => TypeConverter::DATE_TIME,
        self::END_DATE => TypeConverter::DATE_TIME,
        self::TRAINER_ID => TypeConverter::STRING,
        self::HALL_ID => TypeConverter::STRING,
        self::COURSE_ID => TypeConverter::STRING,
        self::TRAINING_TYPE => TypeConverter::INTEGER,
        self::IS_CANCELED => TypeConverter::BOOL,
        self::BASE_TRAINING_START_DATE => TypeConverter::DATE_TIME,
        self::IS_TRAINER_REPLACE => TypeConverter::BOOL,
        self::MAX_REGISTRATIONS => TypeConverter::INTEGER,
    ];
}