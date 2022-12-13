<?php
declare(strict_types=1);

namespace App\User\App\Service;

use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;
use App\Common\App\Transaction\TransactionInterface;
use App\Security\UserAuthenticator;
use App\User\App\Data\UserData;
use App\User\App\Lock\LockNames;
use App\User\App\Query\UserQueryServiceInterface;
use App\User\Domain\Model\Email;
use App\User\Domain\Model\Role;
use App\User\Domain\Model\UserId;
use App\User\Domain\Service\UserService;

class UserAppService
{
    private UserService $userService;
    private UserQueryServiceInterface $userQueryService;
    private TransactionInterface $transaction;
    private MultiBlockingOperationExecutorInterface $blockingOperatorExecutor;


    public function __construct(UserService $userService, UserQueryServiceInterface $userQueryService, TransactionInterface $transaction, MultiBlockingOperationExecutorInterface $blockingOperationExecutor)
    {
        $this->userService = $userService;
        $this->userQueryService = $userQueryService;
        $this->transaction = $transaction;
        $this->blockingOperatorExecutor = $blockingOperationExecutor;
    }

    /**
     * @param string $email
     * @param string $password
     * @param string|null $firstName
     * @param string|null $middleName
     * @param string|null $lastName
     * @param string|null $phone
     * @param string|null $avatarUrl
     * @param string|null $birthday
     * @param string|null $lastVisit
     * @return string
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
    ): string
    {
        return (string)$this->transaction->execute(
            function () use (
                $email,
                $password,
                $role,
                $firstName,
                $middleName,
                $lastName,
                $phone,
                $avatarUrl,
                $birthday,
                $lastVisit
            ): UserId
            {
                return $this->userService->createUser(
                    $email,
                    $password,
                    $role,
                    $firstName,
                    $middleName,
                    $lastName,
                    $phone,
                    $avatarUrl,
                    $birthday,
                    $lastVisit,
                );
            }
        );
    }

    public function getUserData(string $userId): ?UserData
    {
        return $this->userQueryService->getUserDataById($userId);
    }

    /**
     * @param string[]|null $userIds
     * @param int|null $role
     * @return UserData[]
     */
    public function getUsersData(?array $userIds, ?int $role): array
    {
        return $this->userQueryService->listUsersData($userIds, $role);
    }

    public function updateUserData(UserData $userData): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getUserId($userData->getUserId())],
            function () use ($userData): void
            {
                $this->userService->updateUserData(
                    new UserId($userData->getUserId()),
                    $userData->getRole(),
                    $userData->getPhone(),
                    $userData->getFirstName(),
                    $userData->getMiddleName(),
                    $userData->getLastName(),
                    new Email($userData->getEmail()),
                    $userData->getAvatarUrl(),
                    $userData->getBirthday(),
                );
            }
        );
        $this->transaction->execute($operation);
    }

    public function changeUserPassword(string $userId, string $newPassword, string $oldPassword): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getUserId($userId)],
            function () use ($userId, $newPassword, $oldPassword): void
            {
                $this->userService->changeUserPassword(new UserId($userId), $newPassword, $oldPassword);
            }
        );
        $this->transaction->execute($operation);
    }

    public function removeUsers(array $userIds): void
    {
        foreach ($userIds as $userId)
        {
            $operation = $this->blockingOperatorExecutor->execute(
                [LockNames::getUserId($userId)],
                function () use ($userId): void
                {
                    $this->userService->removeUser(new UserId($userId));
                }
            );
            $this->transaction->execute($operation);
        }
    }

    public function findUserByEmailAndPassword(string $email, string $password): ?UserData
    {
        return $this->userQueryService->getUserDataByEmailAndPassword($email, $password);
    }
}