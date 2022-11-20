<?php
declare(strict_types=1);

namespace App\Training\App\Data;

use App\Training\Domain\Model\TrainingType;

class CourseData implements \JsonSerializable
{
    public function __construct(
        private string $courseId,
        private string $title,
    ){}

    public function getCourseId(): string
    {
        return $this->courseId;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->courseId,
            'title' => $this->title,
        ];
    }
}