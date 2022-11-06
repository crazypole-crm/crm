<?php
declare(strict_types=1);

namespace App\User\Domain\Service;

use App\User\Domain\Exception\InvalidUserEmailException;
use App\User\Domain\Exception\InvalidUserIdException;
use App\User\Domain\Exception\InvalidUserPasswordException;
use App\User\Domain\Model\Email;
use App\User\Domain\Model\Password;
use App\User\Domain\Model\User;
use App\User\Domain\Model\UserId;
use App\User\Domain\Model\UserRepositoryInterface;

class UserService
{
    /** @var UserRepositoryInterface */
    private $repository;

    public function __construct(UserRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param string $email
     * @param string $password
     * @return UserId
     * @throws InvalidUserEmailException
     */
    public function createUser(string $email, string $password): UserId
    {
        // TODO: обернуть в транзакцию
        $user = $this->repository->findUserByEmail($email);
        if ($user !== null)
        {
            throw new InvalidUserEmailException('User with this email already exist');
        }
        $user = new User($this->repository->nextId(), new Email($email), new Password($password));
        $this->repository->add($user);
        return $user->getUserId();
    }

    /**
     * @param UserId $userId
     * @param string $phone
     * @param string $firstName
     * @param string $lastName
     * @param Email $email`1
     * @param string $avatarUrl
     * @throws InvalidUserIdException
     */
    public function updateUserData(UserId $userId, string $phone, string $firstName, string $lastName, Email $email, string $avatarUrl): void
    {
        //TODO: обернуть в транзакцию
        $user = $this->repository->findUserById($userId);
        if ($user === null)
        {
            throw new InvalidUserIdException($userId);
        }
        $user->setPhone($phone);
        $user->setLastName($lastName);
        $user->setFirstName($firstName);
        $user->setEmail($email);
        $user->setAvatarUrl($avatarUrl);
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
        if ($user->getPassword() === $oldPassword)
        {
            $user->setPassword(new Password($newPassword));
        }
        else
        {
            throw new InvalidUserPasswordException();
        }
    }
}