<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Training\Domain\Model\Hall;
use App\Training\Domain\Model\HallRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class HallRepository implements HallRepositoryInterface
{
    /** @var EntityRepository|ObjectRepository */
    private $repo;
    /** @var EntityManager */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Hall::class);
    }

    public function findHallById(Uuid $hallId): ?Hall
    {
        return $this->repo->findOneBy(['id' => (string)$hallId]);
    }

    public function findHallsByIds(array $hallIds): array
    {
        return $this->repo->findOneBy(['id' => $this->convertUuidsToStrings($hallIds)]);
    }

    public function add(Hall $hall): void
    {
        $this->em->persist($hall);
    }

    public function remove(Hall $hall): void
    {
        $this->em->remove($hall);
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