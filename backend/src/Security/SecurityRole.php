<?php
declare(strict_types=1);

namespace App\Security;

class SecurityRole
{
    public const CLIENT = 'ROLE_CLIENT';
    public const TRAINER = 'ROLE_TRAINER';
    public const ADMIN = 'ROLE_ADMIN';
}