<?php
declare(strict_types=1);

namespace App\User\Domain\Model;

use Doctrine\DBAL\Driver\Middleware;

class User
{
    private string $userId;
    private string $email;
    private string $password;
    private ?string $firstName;
    private ?string $middleName;
    private ?string $lastName;
    private ?string $phone;
    private ?int $birthday;
    private ?string $avatarUrl;
    private ?int $lastVisit;

    public function __construct(UserId $userId, Email $email, Password $password, ?string $firstName = null, ?string $lastName = null, ?string $phone = null, ?string $avatarUrl = null, ?string $middleName = null, ?int $birthday = null, ?int $lastVisit = null)
    {
        $this->userId = (string)$userId;
        if ($email !== null)
        {
            $this->assertEmailValid($email);
        }
        $this->email = (string)$email;
        $this->password = (string)$password;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        if ($phone !== null)
        {
            $this->assertPhoneValid($phone);
        }
        $this->phone = $phone;
        $this->avatarUrl = $avatarUrl;
        $this->middleName = $middleName;
        $this->birthday = $birthday;
        $this->lastVisit = $lastVisit;
    }

    public function getUserId(): UserId
    {
        return new UserID($this->userId);
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(Email $email): void
    {
        $this->email = $email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(Password $password): void
    {
        $this->password = $password;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): void
    {
        $this->phone = $phone;
    }

    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    public function setAvatarUrl(?string $avatarUrl): void
    {
        $this->avatarUrl = $avatarUrl;
    }

    public function getBirthday(): ?int
    {
        return $this->birthday;
    }

    public function getLastVisit(): ?int
    {
        return $this->lastVisit;
    }

    public function getMiddleName(): ?string
    {
        return $this->middleName;
    }

    private function assertEmailValid(Email $email): void
    {
        //TODO сделать валидацию email
    }

    private function assertPhoneValid(string $phone): void
    {
        //TODO сделать валидацию телефона
    }

    private function buildLoginKey(): string
    {
        return md5($this->email . ':' . $this->password);
    }

}