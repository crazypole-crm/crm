<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Query;

use App\Event\App\Data\EventData;
use App\Event\App\Query\EventQueryServiceInterface;
use App\Event\Infrastructure\Query\Hydrator\EventDataHydrator;
use App\Event\Infrastructure\Query\Table\EventTable;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

class EventQueryService implements EventQueryServiceInterface
{
    /** @var Connection */
    private $conn;
    /** @var EventDataHydrator */
    private $hydrator;

    public function __construct(EntityManagerInterface $em, EventDataHydrator $hydrator)
    {
        $this->conn = $em->getConnection();
        $this->hydrator = $hydrator;
    }

    public function getEventData(string $eventId): ?EventData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->conn->createQueryBuilder();
        $qb->from('event', 'e');
        $this->addEventFieldSelect($qb);
        $qb->where("{$const(EventTable::EVENT_ID)} = :eventId");
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, ['eventId' => $eventId])->fetchAssociative();

        return $result ? $this->hydrator->hydrateRow($result) : null;
    }

    public function getUserEvents(string $userId): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('event', 'e');
        $this->addEventFieldSelect($qb);
        $qb->leftJoin('e', 'user_invitation', 'ui', 'e.event_id = ui.event_id');
        $qb->where($qb->expr()->eq('e.' . EventTable::ORGANIZER_ID, ':organizerId'));
        $qb->orWhere($qb->expr()->eq('ui.user_id', ':userId'));
        $qb->setParameter('userId', $userId);
        $qb->setParameter('organizerId', $userId);
        $qb->groupBy('e.event_id');
        $result = $qb->execute()->fetchAllAssociative();
        $data = [];
        foreach ($result as $item)
        {
            $data[] = $this->hydrator->hydrateRow($item);
        }

        return $data;
    }

    private function addEventFieldSelect(QueryBuilder $qb, string $alias = 'e'): void
    {
        $qb->addSelect($alias . '.' . EventTable::EVENT_ID);
        $qb->addSelect($alias . '.' . EventTable::TITLE);
        $qb->addSelect($alias . '.' . EventTable::DESCRIPTION);
        $qb->addSelect($alias . '.' . EventTable::START_DATE);
        $qb->addSelect($alias . '.' . EventTable::END_DATE);
        $qb->addSelect($alias . '.' . EventTable::ORGANIZER_ID);
        $qb->addSelect($alias . '.' . EventTable::PLACE);
    }
}