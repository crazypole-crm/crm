<?php
declare(strict_types=1);

namespace App\Notification\Infrastructure\Sender;

use App\Notification\App\Service\NotificationSenderInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class NotificationSender implements NotificationSenderInterface
{
    private const SEND_NOTIFICATION_URL = 'https://fcm.googleapis.com/fcm/send';

    public function __construct(private HttpClientInterface $client)
    {}

    public function sendMessage(string $title, string $body, array $userIds): void
    {
        $this->client->request(
            'POST',self::SEND_NOTIFICATION_URL
            ,
            [
                'headers' =>
                [
                    'Content-Type' => 'application/json',
                    'Authorization'=> 'key=AAAAbMTbfrc:APA91bFtyJdngD_Z-fL9GAMGt3_s6d27mbN3MeJJKElVm-7YYEPVjmeSijGpbHfsNrM5NQ5IKwXvJ96acLC9Ontq0t0mDyJn27KQGnrkJEzdGU0boP61e8V-9zEDt4rrm1hiSgXAUb8B'
                ],
                'json' => [
                    'data' => [
                        'title' => $title,
                        'description' => $body,
                        'userIds' => json_encode($userIds)
                    ]
                ]
            ]
        );
    }
}