<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

interface HallRepositoryInterface
{
    public function findHallById(Uuid $hallId): ?Hall;

    /**
     * @param Uuid[] $hallIds
     * @return Hall[]
     */
    public function findHallsByIds(array $hallIds): array;

    public function add(Hall $hall): void;

    public function remove(Hall $hall): void;
}