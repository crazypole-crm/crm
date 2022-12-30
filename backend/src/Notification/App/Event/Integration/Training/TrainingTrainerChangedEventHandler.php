<?php
declare(strict_types=1);

namespace App\Notification\App\Event\Integration\Training;

use App\Common\App\Event\EventHandlerInterface;
use App\Common\Domain\Event\EventInterface;
use App\Common\Domain\Uuid;
use App\Notification\App\Service\NotificationSenderInterface;
use App\Training\Domain\Model\Event\TrainingTrainerChangedEvent;
use App\User\Api\Data\Role;

class TrainingTrainerChangedEventHandler implements EventHandlerInterface
{
    private const TYPE = 'training.training_trainer_changed';

    public function __construct(private NotificationSenderInterface $sender)
    {
    }

    public function handleMessage(EventInterface $event): void
    {
        if (!$event instanceof TrainingTrainerChangedEvent)
        {
            return;
        }
        $title = $event->getTitle();
        $date = $event->getStartDate()->format('Y-m-d');
        $stringUserIds = array_map(function (Uuid $id) {
            return (string) $id;
        }, $event->getRegistredUsers());
        $this->sender->sendMessage('Замена тренера на занятие', "Занятие $date '$title' будет вести другой тренер",  $stringUserIds);
    }

    public function isSubscribedTo(string $messageType): bool
    {
        return $messageType === self::TYPE;
    }
}