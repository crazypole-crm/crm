<?php
declare(strict_types=1);

namespace App\Training\Domain\Exception;

use App\Common\Domain\Uuid;

class CourseNotFoundException extends \Exception
{
    public function __construct(Uuid $trainingId)
    {
        parent::__construct("Course with id '$trainingId' not found");
    }
}