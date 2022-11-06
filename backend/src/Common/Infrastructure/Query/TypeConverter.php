<?php
declare(strict_types=1);

namespace App\Common\Infrastructure\Query;

class TypeConverter
{
    public const STRING = 0;
    public const INTEGER = 1;
    public const DATE_TIME = 2;
    public const BOOL = 3;

    public static function hydrateValue($value, int $valueType)
    {
        switch ($valueType)
        {
            case self::BOOL:
                return (bool)$value;
            case self::STRING:
                return (string)$value;
            case self::INTEGER:
                return (int)$value;
            case self::DATE_TIME:
                return new \DateTimeImmutable($value);
        }

        return $value;
    }
}