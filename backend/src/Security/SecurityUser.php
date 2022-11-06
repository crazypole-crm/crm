<?php

namespace App\Security;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class SecurityUser implements UserInterface, PasswordAuthenticatedUserInterface
{
    private $userId;

    //TODO implement roles

    public function __construct(string $userId)
    {
        $this->userId = $userId;
    }

    public function getUserId(): ?string
    {
        return $this->userId;
    }

    public function getUserIdentifier(): string
    {
        return (string)$this->userId;
    }

    public function getUsername(): string
    {
        return (string)$this->userId;
    }

    public function getRoles(): array
    {
        return [];
    }

    public function getPassword(): ?string
    {
        return null;
    }

    public function getSalt(): ?string
    {
        return null;
    }

    public function eraseCredentials()
    {
    }
}
