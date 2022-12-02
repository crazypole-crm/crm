<?php
declare(strict_types=1);

namespace App\User\Domain\Model;

class Role
{
    public const CLIENT = 0;
    public const TRAINER = 1;
    public const ADMIN = 2;

    public static function getValues(): array
    {
        return [
            self::CLIENT,
            self::TRAINER,
            self::ADMIN,
        ];
    }
}