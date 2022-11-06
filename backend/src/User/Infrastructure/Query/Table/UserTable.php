<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Query\Table;

use App\Common\Infrastructure\Query\TypeConverter;

class UserTable
{
    public const USER_ID = 'user_id';
    public const EMAIL = 'email';
    public const PASSWORD = 'password';
    public const LOGIN_KEY = 'login_key';
    public const FIRST_NAME = 'first_name';
    public const LAST_NAME = 'last_name';
    public const PHONE = 'phone';
    public const AVATAR_URL = 'avatar_url';

    public const USER_FIELDS = [
        self::USER_ID => TypeConverter::STRING,
        self::EMAIL => TypeConverter::STRING,
        self::PASSWORD => TypeConverter::STRING,
        self::LOGIN_KEY => TypeConverter::STRING,
        self::FIRST_NAME => TypeConverter::STRING,
        self::LAST_NAME => TypeConverter::STRING,
        self::PHONE => TypeConverter::STRING,
        self::AVATAR_URL => TypeConverter::STRING,
    ];
}