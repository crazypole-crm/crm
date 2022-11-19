<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

interface TrainingRepositoryInterface
{
    public function findHallById(Uuid $hallId): ?Training;

    public function add(Training $event): void;

    public function remove(Training $event): void;
}