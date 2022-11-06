<?php
declare(strict_types=1);

namespace App\User\App\Data;

class AuthenticateUserRequest implements AuthenticateUserRequestInterface
{
    /** @var string|null */
    private $login;
    /** @var string */
    private $password;

    public function __construct(string $password, string $login)
    {
        $this->password = $password;
        $this->login = $login;
    }

    public function getUsernameOrEmail(): string
    {
        return $this->login;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}