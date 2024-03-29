<?php

namespace App\User\Api;

use App\Common\Exception\UserNotAuthenticated;
use App\User\Api\Input\AuthenticateUserInput;
use App\User\Api\Input\ChangeUserPasswordInput;
use App\User\Api\Input\CreateUserInput;
use App\User\App\Data\UserData;

interface ApiInterface
{
    /**
     * @param CreateUserInput $input
     * @return string
     */
    public function createUser(CreateUserInput $input): string;

    /**
     * @param string $userId
     * @return UserData|null
     */
    public function getUserData(string $userId): ?UserData;

    /**
     * @param string[]|null $userIds
     * @param int|null $role
     * @return UserData[]
     */
    public function getUsersData(?array $userIds, ?int $role): array;

    /**
     * @param ChangeUserPasswordInput $input
     * @throw ApiException
     */
    public function changeUserPassword(ChangeUserPasswordInput $input): void;

    /**
     * @param UserData $userData
     */
    public function updateUserData(UserData $userData): void;

    /**
     * @param string[] $userIds
     */
    public function removeUsers(array $userIds): void;

    public function findUserDataByEmailAndPassword(string $email, string $password): ?UserData;
}
