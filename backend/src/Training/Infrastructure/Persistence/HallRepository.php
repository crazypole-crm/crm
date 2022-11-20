<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Training\Domain\Model\Hall;
use App\Training\Domain\Model\HallRepositoryInterface;
use App\Training\Domain\Model\Training;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class HallRepository implements HallRepositoryInterface
{
    private EntityRepository|ObjectRepository $repo;
    private EntityManager $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Training::class);
    }

    public function findHallById(Uuid $hallId): ?Hall
    {
        return $this->repo->findOneBy(['id' => $hallId]);
    }

    public function add(Hall $hall): void
    {
        $this->em->persist($hall);
    }

    public function remove(Hall $hall): void
    {
        $this->em->remove($hall);
    }
}