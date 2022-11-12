<?php
declare(strict_types=1);

namespace App\User\Api\Input;

class CreateUserInput
{

    public function __construct(
        private string $email,
        private string $password,
        private ?string $firstName = null,
        private ?string $middleName = null,
        private ?string $lastName = null,
        private ?string $phone = null,
        private ?string $avatarUrl = null,
        private ?int $birthday = null,
        private ?int $lastVisit = null,
    ){}

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
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

    public function getBirthday(): ?int
    {
        return $this->birthday;
    }

    public function getLastVisit(): ?int
    {
        return $this->lastVisit;
    }
}