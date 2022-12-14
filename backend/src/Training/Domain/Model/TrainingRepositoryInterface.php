<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

interface TrainingRepositoryInterface
{
    public function findById(Uuid $id): ?Training;

    /**
     * @param Uuid $id
     * @return Training[]
     */
    public function findAllByBaseTraining(Uuid $id): array;

    /**
     * @param Uuid[] $hallIds
     * @return Training[]
     */
    public function findAllByHallIds(array $hallIds): array;

    public function findIntersectingTrainingsByTrainerId(\DateTimeImmutable $startDate, \DateTimeImmutable $endDate, Uuid $trainerId): bool;

    public function findIntersectingTrainingsByHallId(\DateTimeImmutable $startDate, \DateTimeImmutable $endDate, Uuid $hallId): bool;

    /**
     * @param Uuid[] $courseIds
     * @return Training[]
     */
    public function findAllByCourseIds(array $courseIds): array;

    public function findAllByTrainerId(Uuid $trainerId): array;

    public function add(Training $event): void;

    public function remove(Training $event): void;
}