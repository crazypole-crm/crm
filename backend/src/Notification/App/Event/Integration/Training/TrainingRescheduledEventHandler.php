<?php
declare(strict_types=1);

namespace App\Notification\App\Event\Integration\Training;

use App\Common\App\Event\EventHandlerInterface;
use App\Common\Domain\Event\EventInterface;
use App\Notification\App\Service\NotificationService;
use App\Training\Domain\Model\Event\TrainingCanceledEvent;
use App\Training\Domain\Model\Event\TrainingRescheduledEvent;
use App\User\Api\Data\Role;

class TrainingRescheduledEventHandler implements EventHandlerInterface
{
    private const TYPE = 'training.training_rescheduled';

    public function __construct(private NotificationService $service)
    {
    }

    public function handleMessage(EventInterface $event): void
    {
        if (!$event instanceof TrainingRescheduledEvent)
        {
            return;
        }
        $title = $event->getTitle();
        $oldDateTime = $event->getOldDateTime()->format('Y-m-d H:i:s');
        $newDateTime = $event->getStartDate()->format('Y-m-d H:i:s');
        $this->service->sendNotification('Занятие перенесено', "Занятие '$title' перенесено с $oldDateTime на $newDateTime", Role::CLIENT);
    }

    public function isSubscribedTo(string $messageType): bool
    {
        return $messageType === self::TYPE;
    }
}