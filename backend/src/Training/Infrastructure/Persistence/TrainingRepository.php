<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Event\Domain\Model\Training;
use App\Event\Domain\Model\TrainingRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class TrainingRepository implements TrainingRepositoryInterface
{
    private EntityRepository|ObjectRepository $repo;
    private EntityManager $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Training::class);
    }

    public function findTrainingById(Uuid $trainingId): ?Training
    {
        return $this->repo->findOneBy(['id' => $trainingId]);
    }

    public function add(Training $event): void
    {
        $this->em->persist($event);
    }

    public function remove(Training $event): void
    {
        $this->em->remove($event);
    }
}