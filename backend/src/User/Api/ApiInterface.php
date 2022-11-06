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
     * @param AuthenticateUserInput $input
     * @throws UserNotAuthenticated
     */
    public function authenticateUser(AuthenticateUserInput $input): void;

    /**
     * @param string $userId
     * @return UserData|null
     */
    public function getUserData(string $userId): ?UserData;

    /**
     * @param string[] $userIds
     * @return UserData[]
     */
    public function getUsersData(array $userIds): array;

    /**
     * @param ChangeUserPasswordInput $input
     * @throw ApiException
     */
    public function changeUserPassword(ChangeUserPasswordInput $input): void;

    /**
     * @param UserData $userData
     */
    public function updateUserData(UserData $userData): void;

    public function getAllUsers(): array;
}
