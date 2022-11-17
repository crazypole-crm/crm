<?php
declare(strict_types=1);

namespace App\User\App\Data;

class UserData
{
    public function __construct(
        private string $userId,
        private string $email,
        private ?string $firstName,
        private ?string $middleName,
        private ?string $lastName,
        private ?string $phone,
        private ?string $avatarUrl,
        private ?string $birthday = null,
        private ?string $lastVisit = null,
    ){}

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
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

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setFirstName(?string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function setLastName(?string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function setPhone(?string $phone): void
    {
        $this->phone = $phone;
    }

    public function getMiddleName(): ?string
    {
        return $this->middleName;
    }

    public function setMiddleName(?string $middleName): void
    {
        $this->middleName = $middleName;
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