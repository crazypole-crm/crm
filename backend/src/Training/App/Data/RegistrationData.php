<?php
declare(strict_types=1);

namespace App\Training\App\Data;

class RegistrationData
{
    public function __construct(
        private string $id,
        private string $trainingId,
        private string $userId,
        private int $status
    ) {
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getTrainingId(): string
    {
        return $this->trainingId;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function getStatus(): int
    {
        return $this->status;
    }
}