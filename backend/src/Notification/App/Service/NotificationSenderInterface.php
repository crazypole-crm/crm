<?php

namespace App\Notification\App\Service;

interface NotificationSenderInterface
{
    /**
     * @param string $title
     * @param string $body
     * @param string[] $userIds
     */
    public function sendMessage(string $title, string $body, array $userIds): void;
}