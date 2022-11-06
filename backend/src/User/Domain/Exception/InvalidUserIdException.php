<?php
declare(strict_types=1);

namespace App\User\Domain\Exception;

use App\User\Domain\Model\UserId;

class InvalidUserIdException extends \Exception
{
    public function __construct(UserID $userId)
    {
        parent::__construct("User with id '$userId' does not exists");
    }
}