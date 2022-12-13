<?php
declare(strict_types=1);

namespace App\Notification\App\Service;

use App\User\Api\ApiInterface;

class NotificationService
{
    public function __construct(private ApiInterface $userApi, private NotificationSenderInterface $notificationSender)
    {}

    public function sendNotification(string $title, string $body, int $role): void
    {
        $userIds = $this->userApi->getUsersData(null, $role);
        if (empty($userIds))
        {
            return;
        }
        $this->notificationSender->sendMessage($title, $body, $userIds);
    }
}