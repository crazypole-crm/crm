<?php
declare(strict_types=1);

namespace App\User\Api\Input;

class CreateUserInput
{
    /** @var string */
    private $email;
    /** @var string */
    private $password;

    public function __construct(string $email, string $password)
    {
        $this->password = $password;
        $this->email = $email;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }
}