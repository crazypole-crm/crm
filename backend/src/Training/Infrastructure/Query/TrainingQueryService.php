<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query;

use App\Common\Infrastructure\Query\TypeConverter;
use App\Training\App\Data\TrainingData;
use App\Training\App\Query\ListTrainingSpecification;
use App\Training\App\Query\TrainingQueryServiceInterface;
use App\Training\Infrastructure\Query\Hydrator\CourseDataHydrator;
use App\Training\Infrastructure\Query\Hydrator\RegistrationDataHydrator;
use App\Training\Infrastructure\Query\Hydrator\TrainingDataHydrator;
use App\Training\Infrastructure\Query\Table\CourseTable;
use App\Training\Infrastructure\Query\Hydrator\HallDataHydrator;
use App\Training\Infrastructure\Query\Table\HallTable;
use App\Training\Infrastructure\Query\Table\RegistrationTable;
use App\Training\Infrastructure\Query\Table\TrainingTable;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

class TrainingQueryService implements TrainingQueryServiceInterface
{
    private Connection $conn;
    private TrainingDataHydrator $hydrator;
    private CourseDataHydrator $courseDataHydrator;
    private HallDataHydrator $hallDataHydrator;
    private RegistrationDataHydrator $registrationHydrator;

    public function __construct(
        EntityManagerInterface $em,
        TrainingDataHydrator $hydrator,
        CourseDataHydrator $courseDataHydrator,
        HallDataHydrator $hallDataHydrator,
        RegistrationDataHydrator $registrationHydrator
    )
    {
        $this->conn = $em->getConnection();
        $this->hydrator = $hydrator;
        $this->courseDataHydrator = $courseDataHydrator;
        $this->hallDataHydrator = $hallDataHydrator;
        $this->registrationHydrator = $registrationHydrator;
    }

    public function listTrainings(ListTrainingSpecification $spec): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('training', 't');
        $qb->innerJoin('t','base_training', 'bt', $qb->expr()->eq('t.base_id', 'bt.id'));
        $this->addTrainingFieldSelect($qb);
        if ($spec->getStartDate() !== null)
        {
            $qb->andWhere($qb->expr()->gte('t.' . TrainingTable::START_DATE, ':startDate'));
            $qb->setParameter('startDate', $spec->getStartDate()->format('Y-m-d H:i:s'));
        }
        if ($spec->getEndDate() !== null)
        {
            $qb->andWhere($qb->expr()->lte('t.'  . TrainingTable::END_DATE, ':endDate'));
            $qb->setParameter('endDate', $spec->getEndDate()->format('Y-m-d H:i:s'));
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
        $this->addTrainingFieldSelect($qb);
        $qb->where("{$const(TrainingTable::COURSE_ID)} = :trainingId");
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, ['trainingId' => $eventId])->fetchAssociative();

        return $result ? $this->hydrator->hydrateRow($result) : null;
    }

    public function getUserTrainings(string $userId): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('event', 'e');
        $this->addTrainingFieldSelect($qb);
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

    public function listCourses(): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('course', 'c');
        $qb->addSelect('c.' . CourseTable::COURSE_ID);
        $qb->addSelect('c.' . CourseTable::TITLE);
        $stmt = $qb->executeQuery()->fetchAllAssociative();
        $result = [];
        foreach ($stmt as $row)
        {
            $result[] = $this->courseDataHydrator->hydrateRow($row);
        }
        return $result;
    }

    public function listHalls(): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('hall', 'h');
        $qb->addSelect('h.' . HallTable::HALL_ID);
        $qb->addSelect('h.' . HallTable::TITLE);
        $qb->addSelect('h.' . HallTable::CAPACITY);
        $stmt = $qb->executeQuery()->fetchAllAssociative();
        $result = [];
        foreach ($stmt as $row)
        {
            $result[] = $this->hallDataHydrator->hydrateRow($row);
        }
        return $result;
    }

    public function listRegistrationsByTrainingId(string $trainingId): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('training_registration', 'tr');
        $this->addTrainingRegistrationFieldSelect($qb, 'tr');
        $qb->where($qb->expr()->eq('tr.' . RegistrationTable::TRAINING_ID, ':trainingId'));
        $qb->setParameter('trainingId', $trainingId);

        $stmt = $qb->executeQuery()->fetchAllAssociative();
        $result = [];
        foreach ($stmt as $row)
        {
            $result[] = $this->registrationHydrator->hydrateRow($row);
        }
        return $result;
    }

    public function listRegistrationsByUserId(string $userId): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('training_registration', 'tr');
        $this->addTrainingRegistrationFieldSelect($qb, 'tr');
        $qb->where($qb->expr()->eq('tr.' . RegistrationTable::USER_ID, ':userId'));
        $qb->setParameter('userId', $userId);

        $stmt = $qb->executeQuery()->fetchAllAssociative();
        $result = [];
        foreach ($stmt as $row)
        {
            $result[] = $this->registrationHydrator->hydrateRow($row);
        }
        return $result;
    }


    public function countTrainingRegistrations(string $trainingId): int
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('training_registration', 'tr');
        $qb->select('count(tr.' . RegistrationTable::ID . ') AS registrations_count');
        $qb->where($qb->expr()->eq('tr.' . RegistrationTable::TRAINING_ID, ':trainingId'));
        $qb->setParameter('trainingId', $trainingId);

        $row = $qb->executeQuery()->fetchAssociative();
        return $row['registrations_count'];
    }

    public function getTrainingRegistrationsCountMap(array $trainingIds): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('training_registration', 'tr');
        $qb->addSelect('tr.' . RegistrationTable::TRAINING_ID . ' AS ' . RegistrationTable::TRAINING_ID);
        $qb->addSelect('COUNT(tr.' . RegistrationTable::ID . ') AS registrations_count');
        $qb->where($qb->expr()->in('tr.' . RegistrationTable::TRAINING_ID, ':trainingIds'));
        $qb->groupBy('tr.' . RegistrationTable::TRAINING_ID);
        $qb->setParameter('trainingIds', $trainingIds, Connection::PARAM_STR_ARRAY);

        $stmt = $qb->executeQuery()->fetchAllAssociative();
        $result = [];
        foreach ($stmt as $row)
        {
            $id = TypeConverter::hydrateValue($row[RegistrationTable::TRAINING_ID], RegistrationTable::REGISTRATION_FIELDS[RegistrationTable::TRAINING_ID]);
            $registrationsCount = TypeConverter::hydrateValue($row['registrations_count'], TypeConverter::INTEGER);
            $result[$id] = $registrationsCount;
        }
        return $result;
    }

    private function addTrainingFieldSelect(QueryBuilder $qb, string $alias = 't'): void
    {
        $qb->addSelect($alias . '.' . TrainingTable::TRAINING_ID . ' AS ' . TrainingTable::TRAINING_ID );
        $qb->addSelect($alias . '.' . TrainingTable::BASE_TRAINING_ID . ' AS ' . TrainingTable::BASE_TRAINING_ID);
        $qb->addSelect($alias . '.' . TrainingTable::TITLE . ' AS ' . TrainingTable::TITLE);
        $qb->addSelect($alias . '.' . TrainingTable::DESCRIPTION . ' AS ' . TrainingTable::DESCRIPTION);
        $qb->addSelect($alias . '.' . TrainingTable::START_DATE . ' AS ' . TrainingTable::START_DATE);
        $qb->addSelect($alias . '.' . TrainingTable::END_DATE . ' AS ' . TrainingTable::END_DATE);
        $qb->addSelect($alias . '.' . TrainingTable::TRAINER_ID . ' AS ' . TrainingTable::TRAINER_ID);
        $qb->addSelect($alias . '.' . TrainingTable::HALL_ID . ' AS ' . TrainingTable::HALL_ID);
        $qb->addSelect($alias . '.' . TrainingTable::COURSE_ID . ' AS ' . TrainingTable::COURSE_ID);
        $qb->addSelect($alias . '.' . TrainingTable::TRAINING_TYPE . ' AS ' . TrainingTable::TRAINING_TYPE);
        $qb->addSelect($alias . '.' . TrainingTable::IS_CANCELED . ' AS ' . TrainingTable::IS_CANCELED);
        $qb->addSelect($alias . '.' . TrainingTable::MAX_REGISTRATIONS . ' AS ' . TrainingTable::MAX_REGISTRATIONS);
        $qb->addSelect("bt.start_date AS " . TrainingTable::BASE_TRAINING_START_DATE);
        $qb->addSelect("IF(t.trainer_id = bt.trainer_id, 0, 1) AS " . TrainingTable::IS_TRAINER_REPLACE);
    }

    private function addTrainingRegistrationFieldSelect(QueryBuilder $qb, string $alias): void
    {
        $qb->addSelect($alias . '.' . RegistrationTable::ID . ' AS ' . RegistrationTable::ID);
        $qb->addSelect($alias . '.' . RegistrationTable::TRAINING_ID . ' AS ' . RegistrationTable::TRAINING_ID);
        $qb->addSelect($alias . '.' . RegistrationTable::USER_ID . ' AS ' . RegistrationTable::USER_ID);
        $qb->addSelect($alias . '.' . RegistrationTable::STATUS . ' AS ' . RegistrationTable::STATUS);
    }
}