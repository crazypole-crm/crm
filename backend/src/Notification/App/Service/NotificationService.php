<?php
declare(strict_types=1);

namespace App\Notification\App\Service;

use App\User\Api\ApiInterface;
use App\User\App\Data\UserData;

class NotificationService
{
    public function __construct(private ApiInterface $userApi, private NotificationSenderInterface $notificationSender)
    {}

    public function sendNotification(string $title, string $body, int $role): void
    {
        $usersData = $this->userApi->getUsersData(null, $role);
        if (empty($usersData))
        {
            return;
        }
        $this->notificationSender->sendMessage($title, $body, array_map(
            static function (UserData $userData): string {
                return $userData->getUserId();
            }, $usersData
        ));
    }
}