<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

interface RoomRepositoryInterface
{
    public function findRoomById(Uuid $eventId): ?Hall;

    public function add(Hall $room): void;

    public function remove(Hall $room): void;
}