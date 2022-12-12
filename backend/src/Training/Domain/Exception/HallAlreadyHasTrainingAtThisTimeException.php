<?php
declare(strict_types=1);

namespace App\Training\Domain\Exception;

class HallAlreadyHasTrainingAtThisTimeException extends \Exception
{
    public function __construct()
    {
        parent::__construct("Hall already have training at this time");
    }
}