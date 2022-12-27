<?php
declare(strict_types=1);

namespace App\Training\Domain\Exception;

use App\Common\Domain\Uuid;

class RegistrationNotFoundException extends \Exception
{
    public function __construct(Uuid $registrationId)
    {
        parent::__construct("Registration with id $registrationId does not exists");
    }
}