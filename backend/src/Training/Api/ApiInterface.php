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

    public function removeTraining(string $baseId): void;

    public function listTrainings(ListTrainingInput $input): array;

    public function listCourses(): array;

    public function createHall(string $name, int $capacity): string;

    public function createCourse(string $name): string;
}