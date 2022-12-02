<?php

namespace App\Security;

use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class SecurityUser implements UserInterface, PasswordAuthenticatedUserInterface
{
    private $userId;
    private array $roles;

    public function __construct(string $userId, array $roles)
    {
        $this->userId = $userId;
        $this->roles = $roles;
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
        return $this->roles;
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
