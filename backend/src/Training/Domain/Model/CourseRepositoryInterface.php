<?php
declare(strict_types=1);

namespace App\Event\Domain\Model;

use App\Common\Domain\Uuid;

interface CourseRepositoryInterface
{
    public function findById(Uuid $eventId): ?Course;

    public function add(Course $course): void;

    public function remove(Course $course): void;
}