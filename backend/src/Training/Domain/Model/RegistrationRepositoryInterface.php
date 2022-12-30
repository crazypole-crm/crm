<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

interface RegistrationRepositoryInterface
{
    public function add(Registration $registration): void;

    public function remove(Registration $registration): void;

    public function findOneById(Uuid $id): ?Registration;

    public function countRegistrationsByTrainingId(Uuid $trainingId): int;

    /**
     * @param Uuid $trainingId
     * @return Registration[]
     */
    public function findRegistrationsByTrainingId(Uuid $trainingId): array;
}