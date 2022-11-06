<?php
declare(strict_types=1);

namespace App\User\App\Lock;

class LockNames
{
    private const USER_LOCK_NAME = 'user_lock_';

    public static function getUserId(string $userId): string
    {
        return self::USER_LOCK_NAME . $userId;
    }
}