<?php
declare(strict_types=1);

namespace App\Training\Api\Data;

use App\Training\Domain\Model\TrainingType as DomainTrainingType;

class TrainingType
{
    public const GROUP_TRAINING = DomainTrainingType::GROUP_TRAINING;
    public const INDIVIDUAL_TRAINING = DomainTrainingType::INDIVIDUAL_TRAINING;
}