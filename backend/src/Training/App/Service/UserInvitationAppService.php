<?php
declare(strict_types=1);

namespace App\Event\App\Service;

use App\Event\Domain\Service\UserInvitationService;

class UserInvitationAppService
{
    /** @var UserInvitationService */
    private $invitationService;

    public function __construct(UserInvitationService $invitationService)
    {
        $this->invitationService = $invitationService;
    }

    public function createUsersInvitations(array $userIds, string $eventId): void
    {
        //TODO: обернуть в транзакцию
        //TODO: проверять, что пользователи существуют
        $this->invitationService->createUsersInvitations($userIds, $eventId);
    }
}