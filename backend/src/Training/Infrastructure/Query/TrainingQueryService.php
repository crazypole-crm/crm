<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Query;

use App\Event\App\Data\TrainingData;
use App\Event\App\Query\ListTrainingSpecification;
use App\Event\App\Query\TrainingQueryServiceInterface;
use App\Event\Infrastructure\Query\Hydrator\TrainingDataHydrator;
use App\Event\Infrastructure\Query\Table\TrainingTable;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

class TrainingQueryService implements TrainingQueryServiceInterface
{
    private Connection $conn;
    private TrainingDataHydrator $hydrator;

    public function __construct(EntityManagerInterface $em, TrainingDataHydrator $hydrator)
    {
        $this->conn = $em->getConnection();
        $this->hydrator = $hydrator;
    }

    public function listEvent(ListTrainingSpecification $spec): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('training', 't');
        $this->addEventFieldSelect($qb);
        if ($spec->getStartDate() !== null)
        {
            $qb->where($qb->expr()->gte('t.' . TrainingTable::START_DATE, ':startDate'));
            $qb->setParameter(':startDate', $spec->getStartDate());
        }
        if ($spec->getEndDate() !== null)
        {
            $qb->where($qb->expr()->lte('t.'  . TrainingTable::END_DATE, ':endDate'));
            $qb->setParameter(':endDate', $spec->getEndDate());
        }
        $stmt = $qb->executeQuery()->fetchAllAssociative();
        $result = [];
        foreach ($stmt as $row)
        {
            $result[] = $this->hydrator->hydrateRow($row);
        }
        return $result;
    }

    public function getEventData(string $eventId): ?TrainingData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->conn->createQueryBuilder();
        $qb->from('event', 'e');
        $this->addEventFieldSelect($qb);
        $qb->where("{$const(TrainingTable::TRAINING_ID)} = :trainingId");
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, ['trainingId' => $eventId])->fetchAssociative();

        return $result ? $this->hydrator->hydrateRow($result) : null;
    }

    public function getUserTrainings(string $userId): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('event', 'e');
        $this->addEventFieldSelect($qb);
        $qb->leftJoin('e', 'user_invitation', 'ui', 'e.event_id = ui.event_id');
        $qb->where($qb->expr()->eq('e.' . TrainingTable::TRAINER_ID, ':organizerId'));
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
        $qb->addSelect($alias . '.' . TrainingTable::TRAINING_ID);
        $qb->addSelect($alias . '.' . TrainingTable::TITLE);
        $qb->addSelect($alias . '.' . TrainingTable::DESCRIPTION);
        $qb->addSelect($alias . '.' . TrainingTable::START_DATE);
        $qb->addSelect($alias . '.' . TrainingTable::END_DATE);
        $qb->addSelect($alias . '.' . TrainingTable::TRAINER_ID);
        $qb->addSelect($alias . '.' . TrainingTable::HALL_ID);
        $qb->addSelect($alias . '.' . TrainingTable::COURSE_ID);
    }
}