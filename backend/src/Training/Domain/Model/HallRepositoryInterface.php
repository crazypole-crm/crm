<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

interface HallRepositoryInterface
{
    public function findHallById(Uuid $eventId): ?Hall;

    public function add(Hall $hall): void;

    public function remove(Hall $hall): void;
}