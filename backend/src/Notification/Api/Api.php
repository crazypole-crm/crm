<?php
declare(strict_types=1);

namespace App\Notification\Api;

use App\Notification\App\Service\NotificationService;

class Api implements ApiInterface
{
    public function __construct(private NotificationService $notificationService)
    {}

    public function notifyUsers(string $title, string $body, int $role): void
    {

        $this->notificationService->sendNotification($title, $body, $role);
    }
}