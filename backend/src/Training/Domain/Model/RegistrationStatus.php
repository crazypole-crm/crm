<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

class RegistrationStatus
{
    public const NOT_ATTENDED = 0;
    public const ATTENDED = 1;

    /**
     * return int[]
     */
    public static function getValues(): array
    {
        return [
            self::NOT_ATTENDED,
            self::ATTENDED,
        ];
    }
}