<?php
declare(strict_types=1);

namespace App\User\App\Service;

use App\Common\App\Transaction\MultiBlockingOperationExecutorInterface;
use App\Common\App\Transaction\TransactionInterface;
use App\Common\Exception\UserNotAuthenticated;
use App\Security\UserAuthenticator;
use App\User\App\Data\AuthenticateUserRequestInterface;
use App\User\App\Data\UserData;
use App\User\App\Lock\LockNames;
use App\User\App\Query\UserQueryServiceInterface;
use App\User\Domain\Model\Email;
use App\User\Domain\Model\UserId;
use App\User\Domain\Service\UserService;

class UserAppService
{
    private UserService $userService;
    private UserQueryServiceInterface $userQueryService;
    private UserAuthenticator $authenticator;
    private TransactionInterface $transaction;
    private MultiBlockingOperationExecutorInterface $blockingOperatorExecutor;


    public function __construct(UserService $userService, UserQueryServiceInterface $userQueryService, UserAuthenticator $authenticator, TransactionInterface $transaction, MultiBlockingOperationExecutorInterface $blockingOperationExecutor)
    {
        $this->authenticator = $authenticator;
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
     * @return UserData[]
     */
    public function getUsersData(?array $userIds): array
    {
        return $this->userQueryService->listUsersData($userIds);
    }

    public function updateUserData(UserData $userData): void
    {
        $operation = $this->blockingOperatorExecutor->execute(
            [LockNames::getUserId($userData->getUserId())],
            function () use ($userData): void
            {
                $this->userService->updateUserData(
                    new UserId($userData->getUserId()),
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

    /**
     * @throws UserNotAuthenticated
     */
    public function authenticateUser(AuthenticateUserRequestInterface $request): void
    {
        $login = $request->getUsernameOrEmail();
        $password = $request->getPassword();
        $userdata = $this->userQueryService->getUserDataByEmailAndPassword($login, $password);
        if ($userdata === null)
        {
            throw new UserNotAuthenticated();
        }
        $this->authenticator->authenticateUserById($userdata->getUserId());
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
}