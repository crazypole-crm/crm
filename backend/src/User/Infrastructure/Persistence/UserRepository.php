<?php
declare(strict_types=1);

namespace App\User\Infrastructure\Persistence;

use App\Common\Domain\UuidGenerator;
use App\User\Domain\Model\User;
use App\User\Domain\Model\UserId;
use App\User\Domain\Model\UserRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class UserRepository implements UserRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(User::class);
    }

    public function findUserByEmail(string $email): ?User
    {
        return $this->repo->findOneBy(['email' => $email]);
    }

    public function findUserById(UserId $userId): ?User
    {
        return $this->repo->findOneBy(['userId' => $userId]);
    }

    public function add(User $user): void
    {
        $this->em->persist($user);
    }

    public function nextId(): UserId
    {
        return new UserId(UuidGenerator::generateUuid());
    }

    public function remove(User $user): void
    {
        $this->em->remove($user);
    }
}