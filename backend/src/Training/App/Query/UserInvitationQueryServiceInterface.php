<?php
declare(strict_types=1);

namespace App\Training\App\Query;

interface UserInvitationQueryServiceInterface
{
    /**
     * @param string[] $eventIds
     * @return array<string, string[]>
     */
    public function getInvitedUsersByEventIds(array $eventIds): array;
}