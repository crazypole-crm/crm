<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class RegistrationTable
{
    public const ID = 'id';
    public const TRAINING_ID = 'training_id';

    public const USER_ID = 'user_id';

    public const STATUS = 'status';

    public const REGISTRATION_FIELDS = [
        self::ID => TypeConverter::STRING,
        self::TRAINING_ID => TypeConverter::STRING,
        self::USER_ID => TypeConverter::STRING,
        self::STATUS => TypeConverter::INTEGER,
    ];
}