<?php
declare(strict_types=1);

namespace App\User\Domain\Model;

class Password
{
    /** @var string */
    private $password;

    public function __construct(string $password)
    {
        $this->assertPasswordValid($password);
        $this->password = $password;
    }

    private function assertPasswordValid(string $password): void
    {
        //TODO validate;
    }

    public function __toString(): string
    {
        return $this->password;
    }
}