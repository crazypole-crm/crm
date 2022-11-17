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
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Training::class);
    }

    public function findEventByEmail(string $email): ?Training
    {
        return $this->repo->findOneBy(['email' => $email]);
    }

    public function findEventByEmailAndUsername(string $email, string $username): ?Training
    {
        return $this->repo->findOneBy(['email' => $email, 'username' => $username]);
    }

    public function findEventById(Uuid $eventId): ?Training
    {
        return $this->repo->findOneBy(['id' => $eventId]);
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