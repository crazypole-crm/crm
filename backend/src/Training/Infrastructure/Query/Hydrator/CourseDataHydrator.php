<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\Training\App\Data\CourseData;
use App\Training\App\Data\TrainingData;
use App\Training\Infrastructure\Query\Table\CourseTable;
use App\Training\Infrastructure\Query\Table\TrainingTable;

class CourseDataHydrator
{
    public function hydrateRow(array $data): CourseData
    {
        $id = TypeConverter::hydrateValue($data[CourseTable::COURSE_ID], CourseTable::EVENT_FIELDS[CourseTable::COURSE_ID]);
        $title = TypeConverter::hydrateValue($data[CourseTable::TITLE], CourseTable::EVENT_FIELDS[CourseTable::TITLE]);
        return new CourseData($id, $title);
    }
}