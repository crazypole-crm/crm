<?php
declare(strict_types=1);

namespace App\User\Api\Output;

use App\User\App\Data\UserData;

class AuthenticateUserOutput
{
    /** @var UserData|null */
    private $userData;

    public function __construct(?UserData $userData)
    {
        $this->userData = $userData;
    }

    public function getUserData(): ?UserData
    {
        return $this->userData;
    }
}