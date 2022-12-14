<?php
declare(strict_types=1);

namespace App\Notification\Infrastructure\Sender;

use App\Notification\App\Service\NotificationSenderInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class NotificationSender implements NotificationSenderInterface
{
    private const SEND_NOTIFICATION_URL = 'https://fcm.googleapis.com/fcm/send';
    private const MESSAGE_TOPIC = '/topics/crazyPole';

    public function __construct(private HttpClientInterface $client)
    {}

    public function sendMessage(string $title, string $body, array $userIds): void
    {
       $response = $this->client->request(
            'POST',self::SEND_NOTIFICATION_URL,
            [
                'headers' =>
                [
                    'Content-Type' => 'application/json',
                    'Authorization'=> 'key=AAAAbMTbfrc:APA91bHEHlpYtqaX_5qWGv-PdiM4bpH4o3nSQxuIYV5DQrmzURvQkqGTEXIuaJIuq0swqt8GLLXZvOXFOKlC9wqyzkA2f2fX0DtdXFFJu9_g4yDeOErFzPILkIGPWZzxEn9vp8Hta7Qy'
                ],
                'body' => json_encode([
                    'data' => [
                        'title' => $title,
                        'description' => $body,
                        'userIds' => json_encode($userIds)
                    ],
                    'to' => self::MESSAGE_TOPIC
                ], JSON_THROW_ON_ERROR)
            ]
        );
        if ($response->getStatusCode() !== Response::HTTP_OK && json_decode($response->getContent())['message_id'] !== null)
        {
            throw new \RuntimeException('Message do not send');
        }
    }
}