<?php
declare(strict_types=1);

namespace App\User\Api;

use App\User\Api\Input\AuthenticateUserInput;
use App\User\Api\Input\ChangeUserPasswordInput;
use App\User\Api\Input\CreateUserInput;
use App\User\App\Data\UserData;
use App\User\App\Service\UserAppService;
use App\User\Domain\Exception\InvalidUserEmailException;

class Api implements ApiInterface
{
    /** @var UserAppService */
    private $userService;

    public function __construct(UserAppService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * @param CreateUserInput $input
     * @return string
     * @throws InvalidUserEmailException
     */
    public function createUser(CreateUserInput $input): string
    {
        try
        {
            return $this->userService->createUser($input->getEmail(), $input->getPassword());
        }
        catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    public function changeUserPassword(ChangeUserPasswordInput $input): void
    {
        try
        {
            $this->userService->changeUserPassword($input->getUserId(), $input->getNewPassword(), $input->getOldPassword());
        }
        catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    /**
     * @param AuthenticateUserInput $input
     * @throws \Exception
     */
    public function authenticateUser(AuthenticateUserInput $input): void
    {
        try
        {
            $this->userService->authenticateUser($input);
        }
        catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    public function getUserData(string $userId): ?UserData
    {
        try
        {
            return $this->userService->getUserData($userId);
        }
        catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    public function getUsersData(array $userIds): array
    {
        try
        {
            return $this->userService->getUsersData($userIds);
        }
        catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    public function updateUserData(UserData $userData): void
    {
        try
        {
            $this->userService->updateUserData($userData);
        }
        catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    private function convertException(\Exception $e)
    {
        // TODO: сделать обработку исключений
        throw $e;
    }
}