<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Training\Domain\Model\Registration;
use App\Training\Domain\Model\RegistrationRepositoryInterface;
use Doctrine\ORM\EntityManagerInterface;

class RegistrationRepository implements RegistrationRepositoryInterface
{

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Registration::class);
    }

    public function add(Registration $registration): void
    {
        $this->em->persist($registration);
    }

    public function remove(Registration $registration): void
    {
        $this->em->remove($registration);   
    }

    public function findOneById(Uuid $id): ?Registration
    {
        return $this->repo->findOneBy(['id' => (string)$id]);
    }

    public function countRegistrationsByTrainingId(Uuid $trainingId): int
    {
        $qb = $this->repo->createQueryBuilder('r');
        $qb->select($qb->expr()->count('r.id'));
        $qb->where($qb->expr()->eq('r.trainingId', ':trainingId'));
        $qb->setParameter('trainingId', (string)$trainingId);

        return $qb->getQuery()->getSingleScalarResult();
    }
}