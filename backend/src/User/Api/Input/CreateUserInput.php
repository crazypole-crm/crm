<?php
declare(strict_types=1);

namespace App\User\Api\Input;

use App\User\Api\Data\Role;

class CreateUserInput
{
    public function __construct(
        private string $email,
        private string $password,
        private int $role = Role::CLIENT,
        private ?string $firstName = null,
        private ?string $middleName = null,
        private ?string $lastName = null,
        private ?string $phone = null,
        private ?string $avatarUrl = null,
        private ?string $birthday = null,
        private ?string $lastVisit = null,
    ){}

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getRole(): int
    {
        return $this->role;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function getMiddleName(): ?string
    {
        return $this->middleName;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function getBirthday(): ?string
    {
        return $this->birthday;
    }

    public function getLastVisit(): ?string
    {
        return $this->lastVisit;
    }
}