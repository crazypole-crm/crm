<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

interface EventRepositoryInterface
{
    public function findEventById(Uuid $eventId): ?Training;

    public function add(Training $event): void;

    public function remove(Training $event): void;
}