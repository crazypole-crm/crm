<?php
declare(strict_types=1);

namespace App\User\Domain\Model\Event;

use App\Common\Domain\Event\EventInterface;
use App\Common\Domain\Uuid;

class UserRemovedEvent implements EventInterface
{
    public const TYPE = 'user.user_removed';

    public function __construct(private Uuid $userId)
    {}

    /**
     * @return Uuid
     */
    public function getUserId(): Uuid
    {
        return $this->userId;
    }

    public function getEventType(): string
    {
        return self::TYPE;
    }
}