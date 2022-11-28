<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

interface BaseTrainingRepositoryInterface
{
    public function findById(Uuid $id): ?BaseTraining;

    public function findAllByHallIds(array $hallIds): array;

    public function findAllByCourseIds(array $courseIds): array;

    public function add(BaseTraining $event): void;

    public function remove(BaseTraining $event): void;
}