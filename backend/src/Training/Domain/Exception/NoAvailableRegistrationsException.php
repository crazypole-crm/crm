<?php
declare(strict_types=1);

namespace App\Training\Domain\Exception;

use App\Common\Domain\Uuid;
class NoAvailableRegistrationsException extends \Exception
{
    public function __construct(Uuid $trainingId)
    {
        parent::__construct("Training $trainingId has no available registrations");
    }
}