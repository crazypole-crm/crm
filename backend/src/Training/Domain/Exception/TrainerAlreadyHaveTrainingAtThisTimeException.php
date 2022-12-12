<?php
declare(strict_types=1);

namespace App\Training\Domain\Exception;

use App\Common\Domain\Uuid;

class TrainerAlreadyHaveTrainingAtThisTimeException extends \Exception
{
    public function __construct()
    {
        parent::__construct("Trainer already have training at this time");
    }
}