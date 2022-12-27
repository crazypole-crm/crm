<?php
declare(strict_types=1);

namespace App\Training\Domain\Exception;

class InvalidRegistrationStatusException extends \Exception
{
    public function __construct()
    {
        parent::__construct('Invalid registration status');
    }
}