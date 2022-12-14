<?php
declare(strict_types=1);

namespace App\Notification\App\Event\Integration\Training;

use App\Common\App\Event\EventHandlerInterface;
use App\Common\Domain\Event\EventInterface;
use App\Notification\App\Service\NotificationService;
use App\Training\Domain\Model\Event\TrainingCanceledEvent;
use App\User\Api\Data\Role;

class TrainingCanceledEventHandler implements EventHandlerInterface
{
    private const TYPE = 'training.training_canceled';

    public function __construct(private NotificationService $service)
    {
    }

    public function handleMessage(EventInterface $event): void
    {
        if (!$event instanceof TrainingCanceledEvent)
        {
            return;
        }
        $title = $event->getTitle();
        $date = $event->getStartDate()->format('Y-m-d');
        $this->service->sendNotification('Занятие отменено', "Занятие $date '$title' отменено", Role::CLIENT);
    }

    public function isSubscribedTo(string $messageType): bool
    {
        return $messageType === self::TYPE;
    }
}