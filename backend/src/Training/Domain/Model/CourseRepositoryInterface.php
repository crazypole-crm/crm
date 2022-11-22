<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;

interface CourseRepositoryInterface
{
    public function findById(Uuid $id): ?Course;

    public function add(Course $course): void;

    public function remove(Course $course): void;
}