<?php
declare(strict_types=1);

namespace App\Training\Domain\Model;

use App\Common\Domain\Uuid;
use App\Training\Domain\Exception\InvalidRegistrationStatusException;

class Registration
{
    private string $id;
    private string $trainingId;
    private string $userId;
    private int $status;

    public function __construct(
        Uuid $id,
        Uuid $trainingId,
        Uuid $userId,
        int $status = RegistrationStatus::NOT_ATTENDED
    )
    {
        $this->id = (string)$id;
        $this->trainingId = (string)$trainingId;
        $this->userId = (string)$userId;
        $this->status = $status;
        $this->assertRegistrationStatus();
    }

    public function getId(): Uuid
    {
        return new Uuid($this->id);
    }

    public function getTrainingId(): Uuid
    {
        return new Uuid($this->trainingId);
    }

    public function getUserId(): Uuid
    {
        return new Uuid($this->userId);
    }

    public function getStatus(): int
    {
        return $this->status;
    }

    public function setStatus(int $status)
    {
        $this->status = $status;
        $this->assertRegistrationStatus();
    }

    private function assertRegistrationStatus(): void
    {
        if (!in_array($this->status, RegistrationStatus::getValues()))
        {
            throw new InvalidRegistrationStatusException();
        }
    }
}