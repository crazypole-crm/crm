<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Query;

use App\User\App\Data\UserData;
use App\User\App\Query\UserQueryServiceInterface;
use App\User\Infrastructure\Query\Hydrator\UserDataHydrator;
use App\User\Infrastructure\Query\Table\UserTable;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\FetchMode;
use Doctrine\DBAL\Query\QueryBuilder;
use Doctrine\ORM\EntityManagerInterface;

class UserQueryService implements UserQueryServiceInterface
{
    /** @var Connection */
    private $conn;
    /** @var UserDataHydrator */
    private $hydrator;

    public function __construct(EntityManagerInterface $em, UserDataHydrator $hydrator)
    {
        $this->conn = $em->getConnection();
        $this->hydrator = $hydrator;
    }

    public function getUserDataById(string $userId): ?UserData
    {
        $const = static function (string $value)
        {
            return $value;
        };

        $qb = $this->conn->createQueryBuilder();
        $qb->from('user', 'u');
        $this->addUserFieldSelect($qb);
        $qb->where("{$const(UserTable::USER_ID)} = :userId");
        $query = $qb->getSQL();
        $result = $this->conn->executeQuery($query, ['userId' => $userId])->fetchAssociative();

        return $result ? $this->hydrator->hydrateRow($result) : null;
    }

    public function listUsersData(?array $userIds, ?int $role): array
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('user', 'u');
        $this->addUserFieldSelect($qb);
        if ($userIds !== null)
        {
            $qb->where($qb->expr()->in('u.' . UserTable::USER_ID, ':userIds'));
            $qb->setParameter('userIds', $userIds, Connection::PARAM_STR_ARRAY);
        }
        if ($role !== null)
        {
            $qb->where($qb->expr()->eq('u.' . UserTable::ROLE, ':role'));
            $qb->setParameter('role', $role);
        }
        $result = $qb->executeQuery()->fetchAllAssociative();

        $userData = [];
        foreach ($result as $item)
        {
            $userData[] = $this->hydrator->hydrateRow($item);
        }

        return $userData;
    }

    public function getUserDataByEmailAndPassword(string $email, string $password): ?UserData
    {
        $qb = $this->conn->createQueryBuilder();
        $qb->from('user', 'u');
        $this->addUserFieldSelect($qb);
        $qb->where($qb->expr()->eq(UserTable::EMAIL,  ':email'));
        $qb->andWhere($qb->expr()->eq(UserTable::PASSWORD,  ':password'));
        $qb->setParameter('email', $email);
        $qb->setParameter('password', $password);
        $result = $qb->executeQuery()->fetchAssociative();

        return $result ? $this->hydrator->hydrateRow($result) : null;
    }

    private function addUserFieldSelect(QueryBuilder $qb, string $alias = 'u'): void
    {
        $qb->addSelect($alias . '.' . UserTable::USER_ID);
        $qb->addSelect($alias . '.' . UserTable::EMAIL);
        $qb->addSelect($alias . '.' . UserTable::PASSWORD);
        $qb->addSelect($alias . '.' . UserTable::ROLE);
        $qb->addSelect($alias . '.' . UserTable::FIRST_NAME);
        $qb->addSelect($alias . '.' . UserTable::MIDDLE_NAME);
        $qb->addSelect($alias . '.' . UserTable::LAST_NAME);
        $qb->addSelect($alias . '.' . UserTable::PHONE);
        $qb->addSelect($alias . '.' . UserTable::AVATAR_URL);
        $qb->addSelect($alias . '.' . UserTable::BIRTHDAY);
        $qb->addSelect($alias . '.' . UserTable::LAST_VISIT);
    }
}