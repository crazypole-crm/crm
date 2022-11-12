<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Persistence;

use App\Event\Domain\Model\UserInvitation;
use App\Event\Domain\Model\UserInvitationRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class UserInvitationRepository implements UserInvitationRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(UserInvitation::class);
    }

    public function findById(string $id): ?UserInvitation
    {
        return $this->repo->findOneBy(['id' => $id]);
    }

    public function findByUserIdAndEventId(string $userId, string $eventId): ?UserInvitation
    {
        return $this->repo->findOneBy(['userId' => $userId, 'eventId' => $eventId]);
    }

    public function findByUserIdsAndEventId(array $userIds, string $eventId): \Iterator
    {
        $qb = $this->repo->createQueryBuilder('ui');
        $qb->where($qb->expr()->in('ui.userId', ':userIds'));
        $qb->andWhere($qb->expr()->eq('ui.eventId', ':eventId'));
        $qb->setParameter('userIds', $userIds);
        $qb->setParameter('eventId', $eventId);
        return $qb->getQuery()->toIterable();
    }

    public function add(UserInvitation $invitation): void
    {
        $this->em->persist($invitation);
        $this->em->flush();
    }

    public function update(): void
    {
        $this->em->flush();
    }

    public function remove(UserInvitation $invitation): void
    {
        $this->em->remove($invitation);
        $this->em->flush();
    }
}