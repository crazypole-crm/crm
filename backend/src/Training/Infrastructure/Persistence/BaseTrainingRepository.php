<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Training\Domain\Model\BaseTraining;
use App\Training\Domain\Model\BaseTrainingRepositoryInterface;
use App\Training\Domain\Model\Training;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class BaseTrainingRepository implements BaseTrainingRepositoryInterface
{
    private EntityRepository|ObjectRepository $repo;
    private EntityManager $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Training::class);
    }

    public function findById(Uuid $id): ?BaseTraining
    {
        return $this->repo->findOneBy(['id' => $id]);
    }

    public function add(BaseTraining $event): void
    {
        $this->em->persist($event);
    }

    public function remove(BaseTraining $event): void
    {
        $this->em->remove($event);
    }
}