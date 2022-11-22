<?php
declare(strict_types=1);

namespace App\Training\Domain\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Training\Domain\Exception\CourseNotFoundException;
use App\Training\Domain\Exception\TrainingNotFoundException;
use App\Training\Domain\Exception\HallNotFoundException;
use App\Training\Domain\Model\BaseTraining;
use App\Training\Domain\Model\BaseTrainingRepositoryInterface;
use App\Training\Domain\Model\Course;
use App\Training\Domain\Model\CourseRepositoryInterface;
use App\Training\Domain\Model\Hall;
use App\Training\Domain\Model\HallRepositoryInterface;
use App\Training\Domain\Model\Training;
use App\Training\Domain\Model\TrainingRepositoryInterface;

class TrainingService
{
    private const WEEKS_IN_YEAR = 54;

    public function __construct(
        private TrainingRepositoryInterface $trainingRepository,
        private HallRepositoryInterface $hallRepository,
        private CourseRepositoryInterface $courseRepository,
        private BaseTrainingRepositoryInterface $baseTrainingRepository,
    ){}

    /**
     * @param string $title
     * @param string|null $description
     * @param \DateTimeImmutable $startDate
     * @param \DateTimeImmutable $endDate
     * @param Uuid $hallId
     * @param Uuid $courseId
     * @param Uuid $trainerId
     * @param int $type
     * @param bool $isRepeatable
     * @return Uuid
     * @throws CourseNotFoundException
     * @throws HallNotFoundException
     */
    public function createTraining(
        string $title,
        ?string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        Uuid $hallId,
        Uuid $courseId,
        Uuid $trainerId,
        int $type,
        bool $isRepeatable,
    ): Uuid
    {
//        $hall = $this->hallRepository->findHallById($hallId);
//        if ($hall === null)
//        {
//            throw new HallNotFoundException($hallId);
//        }
        $course = $this->courseRepository->findById($courseId);
        if ($course === null)
        {
            throw new CourseNotFoundException($courseId);
        }
        $baseTraining = new BaseTraining(new Uuid(UuidGenerator::generateUuid()), $startDate, $endDate, $trainerId);
        $this->baseTrainingRepository->add($baseTraining);
        if ($isRepeatable)
        {
            for ($i = 0; $i < self::WEEKS_IN_YEAR; $i++)
            {
                $startDate = $i !== 0 ? $startDate->add(new \DateInterval('P' . $i . 'W')) : $startDate;
                $endDate = $i !== 0 ? $endDate->add(new \DateInterval('P' . $i . 'W')) : $endDate;
                $training = new Training($baseTraining->getId(),
                    new Uuid(UuidGenerator::generateUuid()),
                    $title,
                    $description,
                    $startDate,
                    $endDate,
                    $hallId,
                    $courseId,
                    $trainerId,
                    $type,
                );
                $this->trainingRepository->add($training);
            }
        }
        else
        {
            $training = new Training($baseTraining->getId(),
                new Uuid(UuidGenerator::generateUuid()),
                $title,
                $description,
                $startDate,
                $endDate,
                $hallId,
                $courseId,
                $trainerId,
                $type,
            );
            $this->trainingRepository->add($training);
        }

        return $baseTraining->getId();
    }

    /**
     * @param Uuid $baseTrainingId
     * @param Uuid $trainingId
     * @param string $title
     * @param string|null $description
     * @param \DateTimeImmutable $startDate
     * @param \DateTimeImmutable $endDate
     * @param Uuid $hallId
     * @param Uuid $courseId
     * @param Uuid $trainerId
     * @param int $type
     * @throws CourseNotFoundException
     * @throws HallNotFoundException
     * @throws TrainingNotFoundException
     */
    public function editTraining(
        Uuid $baseTrainingId,
        Uuid $trainingId,
        string $title,
        ?string $description,
        \DateTimeImmutable $startDate,
        \DateTimeImmutable $endDate,
        Uuid $hallId,
        Uuid $courseId,
        Uuid $trainerId,
        int $type,
    ): void
    {
//        $hall = $this->hallRepository->findHallById($hallId);
//        if ($hall === null)
//        {
//            throw new HallNotFoundException($hallId);
//        }
        $course = $this->courseRepository->findById($courseId);
        if ($course === null)
        {
            throw new CourseNotFoundException($courseId);
        }
        $trainings = $this->trainingRepository->findAllByBaseTraining($baseTrainingId);
        $baseTraining = $this->baseTrainingRepository->findById($baseTrainingId);
        if ($baseTraining === null)
        {
            throw new TrainingNotFoundException($baseTrainingId);
        }
        $baseTraining->setEndDate($endDate);
        $baseTraining->setStartDate($startDate);
        $baseTraining->setTrainerId($trainerId);
        foreach ($trainings as $training)
        {
            $training->setName($title);
            $training->setStartDate($startDate);
            $training->setEndDate($endDate);
            $training->setDescription($description);
            $training->setCourseId($courseId);
            $training->setHallId($hallId);
            $training->setTrainerId($trainerId);
            $training->setType($type);
        }
    }

    /**
     * @param string $eventId
     * @throws TrainingNotFoundException
     */
    public function removeTraining(string $eventId): void
    {
        $event = $this->trainingRepository->findById(new Uuid($eventId));
        if ($event === null)
        {
            throw new TrainingNotFoundException(new Uuid($eventId));
        }
        $this->trainingRepository->remove($event);
    }

    public function createHall(string $name, int $capacity): Uuid
    {
        $hall = new Hall(
            new Uuid(UuidGenerator::generateUuid()),
            $name,
            $capacity
        );

        $this->hallRepository->add($hall);
        return $hall->getId();
    }

    public function createCourse(string $name): Uuid
    {
        $course = new Course(
            new Uuid(UuidGenerator::generateUuid()),
            $name,
        );

        $this->courseRepository->add($course);
        return $course->getId();
    }
}