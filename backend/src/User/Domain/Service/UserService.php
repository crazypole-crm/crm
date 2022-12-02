<?php
declare(strict_types=1);

namespace App\User\Domain\Service;

use App\User\Domain\Exception\InvalidUserEmailException;
use App\User\Domain\Exception\InvalidUserIdException;
use App\User\Domain\Exception\InvalidUserPasswordException;
use App\User\Domain\Model\Email;
use App\User\Domain\Model\Password;
use App\User\Domain\Model\Role;
use App\User\Domain\Model\User;
use App\User\Domain\Model\UserId;
use App\User\Domain\Model\UserRepositoryInterface;

class UserService
{
    private UserRepositoryInterface $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $email
     * @param string $password
     * @param int $role
     * @param string|null $firstName
     * @param string|null $middleName
     * @param string|null $lastName
     * @param string|null $phone
     * @param string|null $avatarUrl
     * @param string|null $birthday
     * @param string|null $lastVisit
     * @return UserId
     * @throws InvalidUserEmailException
     */
    public function createUser(
        string $email,
        string $password,
        int $role = Role::CLIENT,
        ?string $firstName = null,
        ?string $middleName = null,
        ?string $lastName = null,
        ?string $phone = null,
        ?string $avatarUrl = null,
        ?string $birthday = null,
        ?string $lastVisit = null,
    ): UserId
    {
        $user = $this->repository->findUserByEmail($email);
        if ($user !== null)
        {
            throw new InvalidUserEmailException('User with this email already exist');
        }
        $user = new User(
            $this->repository->nextId(),
            new Email($email),
            new Password($password),
            $role,
            $firstName,
            $lastName,
            $phone,
            $avatarUrl,
            $middleName,
            $birthday,
            $lastVisit,
        );
        $this->repository->add($user);
        return $user->getUserId();
    }

    /**
     * @param UserId $userId
     * @param string|null $phone
     * @param string|null $firstName
     * @param string|null $middleName
     * @param string|null $lastName
     * @param Email $email
     * @param string|null $avatarUrl
     * @param string|null $birthday
     * @throws InvalidUserIdException
     */
    public function updateUserData(UserId $userId, int $role, ?string $phone, ?string $firstName, ?string $middleName, ?string $lastName, Email $email, ?string $avatarUrl, ?string $birthday = null): void
    {
        $user = $this->repository->findUserById($userId);
        if ($user === null)
        {
            throw new InvalidUserIdException($userId);
        }
        $user->setRole($role);
        $user->setPhone($phone);
        $user->setLastName($lastName);
        $user->setFirstName($firstName);
        $user->setEmail($email);
        $user->setAvatarUrl($avatarUrl);
        $user->setMiddleName($middleName);
        $user->setBirthday($birthday);
    }

    /**
     * @param UserId $userId
     * @param string $newPassword
     * @param string $oldPassword
     * @throws InvalidUserIdException
     * @throws InvalidUserPasswordException
     */
    public function changeUserPassword(UserId $userId, string $newPassword, string $oldPassword): void
    {
        $user = $this->repository->findUserById($userId);
        if ($user === null)
        {
            throw new InvalidUserIdException($userId);
        }
        if ((string)$user->getPassword() === $oldPassword)
        {
            $user->setPassword(new Password($newPassword));
        }
        else
        {
            throw new InvalidUserPasswordException();
        }
    }

    //TODO: обрабатывать событие отметки посещения и обновлять дату визита

    /**
     * @param UserId $userId
     * @param string|null $lastVisit
     * @throws InvalidUserIdException
     */
    public function updateLastVisitTime(UserId $userId, ?string $lastVisit): void
    {
        $user = $this->repository->findUserById($userId);
        if ($user === null)
        {
            throw new InvalidUserIdException($userId);
        }
        $user->setLastVisit($lastVisit);
    }

    public function removeUser(UserId $userId): void
    {
        $user = $this->repository->findUserById($userId);
        if ($user === null)
        {
            throw new InvalidUserIdException($userId);
        }
        $this->repository->remove($user);
    }

}