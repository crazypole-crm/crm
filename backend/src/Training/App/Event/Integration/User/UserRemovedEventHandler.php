<?php
declare(strict_types=1);

namespace App\Training\App\Event\Integration\User;

use App\Common\App\Event\EventHandlerInterface;
use App\Common\Domain\Event\EventInterface;
use App\Training\App\Service\TrainingAppService;
use App\User\Domain\Model\Event\UserRemovedEvent;

class UserRemovedEventHandler implements EventHandlerInterface
{
    private const USER_REMOVED_EVENT_TYPE = 'user.user_removed';

    public function __construct(private TrainingAppService $service)
    {
    }

    public function handleMessage(EventInterface $event): void
    {
        if (!$event instanceof UserRemovedEvent)
        {
            return;
        }

        $this->service->handleTrainerRemoved($event->getUserId());
    }

    public function isSubscribedTo(string $messageType): bool
    {
        return $messageType === self::USER_REMOVED_EVENT_TYPE;
    }
}