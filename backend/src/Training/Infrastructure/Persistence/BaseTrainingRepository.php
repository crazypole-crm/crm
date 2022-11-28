<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Training\Domain\Model\BaseTraining;
use App\Training\Domain\Model\BaseTrainingRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class BaseTrainingRepository implements BaseTrainingRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(BaseTraining::class);
    }

    public function findById(Uuid $id): ?BaseTraining
    {
        return $this->repo->findOneBy(['id' => (string)$id]);
    }

    public function findAllByHallIds(array $hallIds): array
    {
        return $this->repo->findBy(['hallId' => $this->convertUuidsToStrings($hallIds)]);
    }

    public function findAllByCourseIds(array $courseIds): array
    {
        return $this->repo->findBy(['courseId' => $this->convertUuidsToStrings($courseIds)]);
    }

    public function add(BaseTraining $event): void
    {
        $this->em->persist($event);
    }

    public function remove(BaseTraining $event): void
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