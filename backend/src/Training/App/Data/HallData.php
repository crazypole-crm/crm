<?php
declare(strict_types=1);

namespace App\Training\App\Data;

use App\Training\Domain\Model\TrainingType;

class HallData implements \JsonSerializable
{
    public function __construct(
        private string $courseId,
        private string $title,
        private int $capacity,
    ){}

    public function getCourseId(): string
    {
        return $this->courseId;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getCapacity(): int
    {
        return $this->capacity;
    }


    public function jsonSerialize()
    {
        return [
            'id' => $this->courseId,
            'name' => $this->title,
            'capacity' => $this->capacity,
        ];
    }
}