<?php
declare(strict_types=1);

namespace App\User\Api\Input;

class ChangeUserPasswordInput
{
    /** @var string */
    private $userId;
    /** @var string */
    private $oldPassword;
    /** @var string */
    private $newPassword;

    public function __construct(string $userId, string $newPassword, string $oldPassword)
    {
        $this->userId = $userId;
        $this->newPassword = $newPassword;
        $this->oldPassword = $oldPassword;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function getOldPassword(): string
    {
        return $this->oldPassword;
    }

    public function getNewPassword(): string
    {
        return $this->newPassword;
    }
}