<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Training\Domain\Model\Training;
use App\Training\Domain\Model\TrainingRepositoryInterface;
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

    public function findById(Uuid $id): ?Training
    {
        return $this->repo->findOneBy(['id' => (string)$id]);
    }

    /**
     * @param Uuid $id
     * @return Training[]
     */
    public function findAllByBaseTraining(Uuid $id): array
    {
        return $this->repo->findBy(['baseId' => (string)$id]);
    }

    public function findAllByHallIds(array $hallIds): array
    {
        return $this->repo->findBy(['hallId' => $this->convertUuidsToStrings($hallIds)]);
    }

    public function findAllByCourseIds(array $courseIds): array
    {
        return $this->repo->findBy(['courseId' => $this->convertUuidsToStrings($courseIds)]);
    }

    public function add(Training $event): void
    {
        $this->em->persist($event);
    }

    public function remove(Training $event): void
    {
        $this->em->remove($event);
    }

    private function convertUuidsToStrings(array $uuids): array
    {
        return array_map(
            static function (Uuid $uuid): string {
                return (string)$uuid;
            }, $uuids
        );
    }
}