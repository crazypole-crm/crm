<?php
declare(strict_types=1);

namespace App\Event\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\Event\App\Data\TrainingData;
use App\Event\Infrastructure\Query\Table\TrainingTable;

class TrainingDataHydrator
{
    public function hydrateRow(array $data): TrainingData
    {
        $eventId = TypeConverter::hydrateValue($data[TrainingTable::TRAINING_ID], TrainingTable::EVENT_FIELDS[TrainingTable::TRAINING_ID]);
        $title = TypeConverter::hydrateValue($data[TrainingTable::TITLE], TrainingTable::EVENT_FIELDS[TrainingTable::TITLE]);
        $description = TypeConverter::hydrateValue($data[TrainingTable::DESCRIPTION], TrainingTable::EVENT_FIELDS[TrainingTable::DESCRIPTION]);
        $startDate = TypeConverter::hydrateValue($data[TrainingTable::START_DATE], TrainingTable::EVENT_FIELDS[TrainingTable::START_DATE]);
        $endDate = TypeConverter::hydrateValue($data[TrainingTable::END_DATE], TrainingTable::EVENT_FIELDS[TrainingTable::END_DATE]);
        $trainerId = TypeConverter::hydrateValue($data[TrainingTable::TRAINER_ID], TrainingTable::EVENT_FIELDS[TrainingTable::TRAINER_ID]);
        $hallId = TypeConverter::hydrateValue($data[TrainingTable::HALL_ID], TrainingTable::EVENT_FIELDS[TrainingTable::HALL_ID]);
        $courseId = TypeConverter::hydrateValue($data[TrainingTable::COURSE_ID], TrainingTable::EVENT_FIELDS[TrainingTable::COURSE_ID]);
        return new TrainingData($eventId, $title, $description, $startDate, $endDate, $trainerId, $hallId, $courseId);
    }
}