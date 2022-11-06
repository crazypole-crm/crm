<?php
declare(strict_types=1);

namespace App\User\Domain\Service;

class PasswordEncoder
{
    public static function encodePassword(string $password): string
    {
        return md5($password);
    }
}