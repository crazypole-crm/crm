<?php
declare(strict_types=1);

namespace App\User\Domain\Model;

interface UserRepositoryInterface
{
    /**
     * @param string $email
     * @return User|null
     */
    public function findUserByEmail(string $email): ?User;

    /**
     * @param UserId $userId
     * @return User|null
     */
    public function findUserById(UserId $userId): ?User;

    /**
     * @param User $user
     */
    public function add(User $user): void;

    /**
     * @return UserId
     */
    public function nextId(): UserId;
}