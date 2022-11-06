<?php
declare(strict_types=1);

namespace App\User\App\Data;

class UserData
{
    /** @var string */
    private $userId;
    /** @var string */
    private $email;
    /** @var string */
    private $firstName;
    /** @var string|null */
    private $lastName;
    /** @var string|null */
    private $phone;
    /** @var string|null */
    private $avatarUrl;

    public function __construct(string $userId, string $email, ?string $firstName = null, ?string $lastName = null, ?string $phone = null, ?string $avatarUrl = null)
    {
        $this->userId = $userId;
        $this->email = $email;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->phone = $phone;
        $this->avatarUrl = $avatarUrl;
    }

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

    public function setAvatarUrl(?string $avatarUrl): void
    {
        $this->avatarUrl = $avatarUrl;
    }
}