<?php

namespace App\Training\Api;

use App\Training\Api\Input\CreateTrainingInput;
use App\Training\Api\Input\EditTrainingInput;
use App\Training\App\Data\TrainingData;
use App\Training\App\Query\ListTrainingInput;

interface ApiInterface
{
    public function createTraining(CreateTrainingInput $input): string;

    /**
     * @param EditTrainingInput $input
     */
    public function editTraining(EditTrainingInput $input): void;

    public function changeTrainingTrainer(string $trainingId, string $trainerId): void;

    public function changeTrainingTime(string $trainingId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate): void;

    public function changeTrainingStatus(string $trainingId, bool $isCanceled): void;

    public function removeTrainingsByBase(string $baseId): void;

    public function removeTraining(string $trainingId): void;

    public function removeHalls(array $hallIds): void;

    public function removeCourses(array $courseIds): void;

    public function editHall(string $id, string $name, int $capacity): void;

    public function editCourse(string $id, string $name): void;

    public function listTrainings(ListTrainingInput $input): array;

    public function listCourses(): array;

    public function createHall(string $name, int $capacity): string;

    public function listHalls(): array;

    public function createCourse(string $name): string;

    public function createRegistration(string $trainingId, string $userId): string;

    public function changeRegistrationStatus(string $registrationId, int $status): void;

    public function removeRegistration(string $registrationId): void;

    public function listRegistrationsByTrainingId(string $trainingId): array;

    public function listRegistrationsByUserId(string $userId): array;

    public function countTrainingRegistrations(string $trainingId): int;

    /**
     * @param string[] $trainingIds
     * @return array<string, integer>
     */
    public function getTrainingRegistrationsCountMap(array $trainingIds): array;
}