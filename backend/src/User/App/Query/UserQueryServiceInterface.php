<?php
declare(strict_types=1);

namespace App\User\App\Query;

use App\User\App\Data\UserData;

interface UserQueryServiceInterface
{

    /**
     * @param string $userId
     * @return UserData|null
     */
    public function getUserDataById(string $userId): ?UserData;

    /**
     * Undocumented function
     *
     * @param string[] $userIds
     * @return UserData[]
     */
    public function listUsersData(array $userIds): array;

    /**
     * @param string $email
     * @param string $password
     * @return UserData|null
     */
    public function getUserDataByEmailAndPassword(string $email, string $password): ?UserData;
}