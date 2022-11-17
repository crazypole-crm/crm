<?php
declare(strict_types=1);

namespace App\User\Domain\Model;


class User
{
    private string $userId;
    private string $email;
    private string $password;
    private ?string $firstName;
    private ?string $middleName;
    private ?string $lastName;
    private ?string $phone;
    private ?string $birthday;
    private ?string $avatarUrl;
    private ?string $lastVisit;

    public function __construct(
        UserId $userId,
        Email $email,
        Password $password,
        ?string $firstName = null,
        ?string $lastName = null,
        ?string $phone = null,
        ?string $avatarUrl = null,
        ?string $middleName = null,
        ?string $birthday = null,
        ?string $lastVisit = null
    )
    {
        $this->userId = (string)$userId;
        $this->assertEmailValid($email);
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

    /**
     * @return UserId
     */
    public function getUserId(): UserId
    {
        return new UserId($this->userId);
    }

    /**
     * @param UserId $userId
     */
    public function setUserId(UserId $userId): void
    {
        $this->userId = (string)$userId;
    }

    /**
     * @return Email
     */
    public function getEmail(): Email
    {
        return new Email($this->email);
    }

    /**
     * @param Email $email
     */
    public function setEmail(Email $email): void
    {
        $this->email = (string)$email;
    }

    /**
     * @return Password
     */
    public function getPassword(): Password
    {
        return new Password($this->password);
    }

    /**
     * @param Password $password
     */
    public function setPassword(Password $password): void
    {
        $this->password = (string)$password;
    }

    /**
     * @return string|null
     */
    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    /**
     * @param string|null $firstName
     */
    public function setFirstName(?string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string|null
     */
    public function getMiddleName(): ?string
    {
        return $this->middleName;
    }

    /**
     * @param string|null $middleName
     */
    public function setMiddleName(?string $middleName): void
    {
        $this->middleName = $middleName;
    }

    /**
     * @return string|null
     */
    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    /**
     * @param string|null $lastName
     */
    public function setLastName(?string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string|null
     */
    public function getPhone(): ?string
    {
        return $this->phone;
    }

    /**
     * @param string|null $phone
     */
    public function setPhone(?string $phone): void
    {
        $this->phone = $phone;
    }

    /**
     * @return string|null
     */
    public function getBirthday(): ?string
    {
        return $this->birthday;
    }

    /**
     * @param string|null $birthday
     */
    public function setBirthday(?string $birthday): void
    {
        $this->birthday = $birthday;
    }

    /**
     * @return string|null
     */
    public function getAvatarUrl(): ?string
    {
        return $this->avatarUrl;
    }

    /**
     * @param string|null $avatarUrl
     */
    public function setAvatarUrl(?string $avatarUrl): void
    {
        $this->avatarUrl = $avatarUrl;
    }

    /**
     * @return string|null
     */
    public function getLastVisit(): ?string
    {
        return $this->lastVisit;
    }

    /**
     * @param string|null $lastVisit
     */
    public function setLastVisit(?string $lastVisit): void
    {
        $this->lastVisit = $lastVisit;
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