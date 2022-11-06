<?php
declare(strict_types=1);

namespace App\User\Domain\Model;

class Email
{
    /** @var string */
    private $email;

    public function __construct(string $email)
    {
        $this->assertEmailValid($email);
        $this->email = $email;
    }

    private function assertEmailValid(string $email): void
    {
        //TODO validate;
    }

    public function __toString(): string
    {
        return $this->email;
    }
}