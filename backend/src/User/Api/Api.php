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
            return $this->userService->createUser(
                $input->getEmail(),
                $input->getPassword(),
                $input->getRole(),
                $input->getFirstName(),
                $input->getMiddleName(),
                $input->getLastName(),
                $input->getPhone(),
                $input->getAvatarUrl(),
                $input->getBirthday(),
                $input->getLastVisit(),
            );
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

    public function getUsersData(?array $userIds, ?int $role): array
    {
        try
        {
            return $this->userService->getUsersData($userIds, $role);
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

    /**
     * @param string[] $userIds
     * @throws \Exception
     */
    public function removeUsers(array $userIds): void
    {
        try
        {
            $this->userService->removeUsers($userIds);
        }
        catch (\Exception $e)
        {
            $this->convertException($e);
        }
    }

    public function findUserDataByEmailAndPassword(string $email, string $password): ?UserData
    {
        try
        {
            return $this->userService->findUserByEmailAndPassword($email, $password);
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