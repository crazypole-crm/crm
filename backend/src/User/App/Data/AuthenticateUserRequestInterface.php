<?php

namespace App\User\App\Data;

interface AuthenticateUserRequestInterface
{
    /**
     * @return string|null
     */
    public function getUsernameOrEmail(): string;

    /**
     * @return string
     */
    public function getPassword(): string;
}