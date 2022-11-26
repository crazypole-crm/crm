<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Query\Hydrator;

use App\Common\Infrastructure\Query\TypeConverter;
use App\Training\App\Data\HallData;
use App\Training\Infrastructure\Query\Table\HallTable;

class HallDataHydrator
{
    public function hydrateRow(array $data): HallData
    {
        $id = TypeConverter::hydrateValue($data[HallTable::HALL_ID], HallTable::EVENT_FIELDS[HallTable::HALL_ID]);
        $title = TypeConverter::hydrateValue($data[HallTable::TITLE], HallTable::EVENT_FIELDS[HallTable::TITLE]);
        $capacity = TypeConverter::hydrateValue($data[HallTable::CAPACITY], HallTable::EVENT_FIELDS[HallTable::CAPACITY]);
        return new HallData($id, $title, $capacity);
    }
}