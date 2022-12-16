<?php
declare(strict_types=1);

namespace App\Training\Domain\Exception;

class InvalidMaxRegistrationsException extends \Exception
{
    public function __construct(?int $maxRegistrations)
    {
        parent::__construct("Invalid max registration count: $maxRegistrations");
    }
}