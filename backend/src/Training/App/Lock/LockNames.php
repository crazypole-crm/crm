<?php
declare(strict_types=1);

namespace App\Training\App\Lock;

class LockNames
{
    private const TRAINING_ID_LOCK_NAME = 'training_lock_';
    private const HALL_ID_LOCK_NAME = 'hall_lock_';
    private const COURSE_ID_LOCK_NAME = 'course_lock_';
    private const TRAINER_ID_LOCK_NAME = 'trainer_lock_';

    public static function getTrainingLock(string $trainingId): string
    {
        return self::TRAINING_ID_LOCK_NAME . $trainingId;
    }

    public static function getHallLock(string $hallId): string
    {
        return self::HALL_ID_LOCK_NAME . $hallId;
    }

    public static function getCourseLock(string $courseId): string
    {
        return self::COURSE_ID_LOCK_NAME . $courseId;
    }

    public static function getTrainerLock(string $trainerId): string
    {
        return self::TRAINER_ID_LOCK_NAME . $trainerId;
    }

    public static function getHallLocks(array $hallIds): array
    {
        $result = [];
        foreach ($hallIds as $hallId)
        {
            $result[] = self::getHallLock($hallId);
        }

        return $result;
    }

    public static function getCourseLocks(array $courseIds): array
    {
        $result = [];
        foreach ($courseIds as $courseId)
        {
            $result[] = self::getCourseLock($courseId);
        }

        return $result;
    }
}