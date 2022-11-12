<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

interface RoomRepositoryInterface
{
    public function findRoomById(Uuid $eventId): ?Room;

    public function add(Room $room): void;

    public function remove(Room $room): void;
}