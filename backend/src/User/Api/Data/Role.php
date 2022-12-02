<?php
declare(strict_types=1);

namespace App\User\Api\Data;

use App\User\Domain\Model\Role as DomainRole;

class Role
{
    public const CLIENT = DomainRole::CLIENT;
    public const TRAINER = DomainRole::TRAINER;
    public const ADMIN = DomainRole::ADMIN;
}