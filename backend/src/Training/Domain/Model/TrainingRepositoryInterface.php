<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

interface TrainingRepositoryInterface
{
    public function findTrainingById(Uuid $trainingId): ?Training;

    public function add(Training $event): void;

    public function remove(Training $event): void;
}