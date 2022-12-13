<?php

namespace App\Notification\Api;

interface ApiInterface
{
    public function notifyUsers(string $title, string $body, int $role): void;
}