<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Hydrator;

use App\Training\App\Data\RegistrationData;
use App\Training\Infrastructure\Query\Table\RegistrationTable;
use App\Common\Infrastructure\Query\TypeConverter;

class RegistrationDataHydrator
{
    public function hydrateRow(array $data): RegistrationData
    {
        $id = TypeConverter::hydrateValue($data[RegistrationTable::ID], RegistrationTable::REGISTRATION_FIELDS[RegistrationTable::ID]);
        $trainingId = TypeConverter::hydrateValue($data[RegistrationTable::TRAINING_ID], RegistrationTable::REGISTRATION_FIELDS[RegistrationTable::TRAINING_ID]);
        $userId = TypeConverter::hydrateValue($data[RegistrationTable::USER_ID], RegistrationTable::REGISTRATION_FIELDS[RegistrationTable::USER_ID]);
        $status = TypeConverter::hydrateValue($data[RegistrationTable::STATUS], RegistrationTable::REGISTRATION_FIELDS[RegistrationTable::STATUS]);

        return new RegistrationData($id, $trainingId, $userId, $status);
    }
}