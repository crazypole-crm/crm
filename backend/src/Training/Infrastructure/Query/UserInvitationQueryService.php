<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Query;

use App\Event\App\Query\UserInvitationQueryServiceInterface;
use Doctrine\DBAL\Connection;

class UserInvitationQueryService implements UserInvitationQueryServiceInterface
{
    /** @var Connection */
    private $conn;

    public function __construct(Connection $conn)
    {
        $this->conn = $conn;
    }

    public function getInvitedUsersByEventIds(array $eventIds): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('user_invitation', 'ui');
        $qb->select('ui.user_id');
        $qb->addSelect('ui.event_id');
        $qb->where($qb->expr()->in('ui.event_id', ':eventIds'));
        $qb->setParameter('eventIds', $eventIds, Connection::PARAM_STR_ARRAY);
        $result = $qb->execute()->fetchAllAssociative();
        $resultMap = [];
        foreach ($result as $row)
        {
            $resultMap[$row['event_id']][] = $row['user_id'];
        }

        return $resultMap;
    }
}