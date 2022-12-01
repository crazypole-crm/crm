<?php
declare(strict_types=1);

namespace App\Training\Domain\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Training\Domain\Exception\CourseNotFoundException;
use App\Training\Domain\Exception\HallNotFoundException;
use App\Training\Domain\Exception\TrainingNotFoundException;
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
    )
    {
    }

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
        $hall = $this->hallRepository->findHallById($hallId);
        if ($hall === null)
        {
            throw new HallNotFoundException($hallId);
        }
        $course = $this->courseRepository->findById($courseId);
        if ($course === null)
        {
            throw new CourseNotFoundException($courseId);
        }
        $baseTraining = new BaseTraining(
            new Uuid(UuidGenerator::generateUuid()),
            $startDate,
            $endDate,
            $hallId,
            $courseId,
            $trainerId,
            $type,
        );
        $this->baseTrainingRepository->add($baseTraining);
        if ($isRepeatable)
        {
            for ($i = 0; $i < self::WEEKS_IN_YEAR; $i++)
            {
                $training = new Training($baseTraining->getId(),
                    new Uuid(UuidGenerator::generateUuid()),
                    $title,
                    $description,
                    $i !== 0 ? $startDate->add(new \DateInterval('P' . $i . 'W')) : $startDate,
                    $i !== 0 ? $endDate->add(new \DateInterval('P' . $i . 'W')) : $endDate,
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
    public function editTrainingByBase(
        Uuid $baseTrainingId,
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
        $hall = $this->hallRepository->findHallById($hallId);
        if ($hall === null)
        {
            throw new HallNotFoundException($hallId);
        }
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
        $baseTraining->setCourseId($courseId);
        $baseTraining->setHallId($hallId);
        $baseTraining->setTrainerId($trainerId);
        $baseTraining->setType($type);
        $i = 0;
        foreach ($trainings as $training)
        {
            $training->setName($title);
            $training->setStartDate($i !== 0 ? $startDate->add(new \DateInterval('P' . $i . 'W')) : $startDate);
            $training->setEndDate($i !== 0 ? $startDate->add(new \DateInterval('P' . $i . 'W')) : $startDate);
            $training->setDescription($description);
            $training->setCourseId($courseId);
            $training->setHallId($hallId);
            $training->setTrainerId($trainerId);
            $training->setType($type);
            $i++;
        }
    }

    public function changeTrainingTrainer(Uuid $trainingId, Uuid $trainerId): void
    {
        $training = $this->trainingRepository->findById($trainingId);
        if ($training === null)
        {
            throw new TrainingNotFoundException($trainingId);
        }
        $training->setTrainerId($trainerId);
    }

    public function changeChangeTrainingTime(Uuid $trainingId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate): void
    {
        $training = $this->trainingRepository->findById($trainingId);
        if ($training === null)
        {
            throw new TrainingNotFoundException($trainingId);
        }
        $training->setStartDate($startDate);
        $training->setEndDate($endDate);
    }

    public function changeTrainingStatus(Uuid $trainingId, bool $isCanceled): void
    {
        $training = $this->trainingRepository->findById($trainingId);
        if ($training === null)
        {
            throw new TrainingNotFoundException($trainingId);
        }
        $training->setIsCanceled($isCanceled);
    }

    /**
     * @param Uuid $baseId
     */
    public function removeBaseTraining(Uuid $baseId): void
    {
        $trainings = $this->trainingRepository->findAllByBaseTraining($baseId);
        foreach ($trainings as $training)
        {
            $this->trainingRepository->remove($training);
        }
        $baseTraining = $this->baseTrainingRepository->findById($baseId);
        if ($baseTraining === null)
        {
            throw new TrainingNotFoundException($baseTraining);
        }
        $this->baseTrainingRepository->remove($baseTraining);
    }

    public function removeTraining(Uuid $trainingId): void
    {
        $training = $this->trainingRepository->findById($trainingId);
        if ($training === null)
        {
            throw new TrainingNotFoundException($trainingId);
        }
        $this->trainingRepository->remove($training);
    }

    /**
     * @param Uuid[] $hallIds
     */
    public function removeHalls(array $hallIds): void
    {
        $trainings = $this->trainingRepository->findAllByHallIds($hallIds);
        foreach ($trainings as $training)
        {
            $this->trainingRepository->remove($training);
        }
        $baseTrainings = $this->baseTrainingRepository->findAllByHallIds($hallIds);
        foreach ($baseTrainings as $training)
        {
            $this->baseTrainingRepository->remove($training);
        }
        $halls = $this->hallRepository->findHallsByIds($hallIds);
        foreach ($halls as $hall)
        {
            $this->hallRepository->remove($hall);
        }
    }

    /**
     * @param Uuid[] $courseIds
     */
    public function removeCourses(array $courseIds): void
    {
        $trainings = $this->trainingRepository->findAllByCourseIds($courseIds);
        foreach ($trainings as $training)
        {
            $this->trainingRepository->remove($training);
        }
        $baseTrainings = $this->baseTrainingRepository->findAllByCourseIds($courseIds);
        foreach ($baseTrainings as $training)
        {
            $this->baseTrainingRepository->remove($training);
        }
        $courses = $this->courseRepository->findByIds($courseIds);
        foreach ($courses as $course)
        {
            $this->courseRepository->remove($course);
        }
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


    public function editHall(Uuid $id, string $name, int $capacity): void
    {
        $hall = $this->hallRepository->findHallById($id);
        if ($hall === null)
        {
            throw new HallNotFoundException($id);
        }
        $hall->setName($name);
        $hall->setCapacity($capacity);
    }

    public function editCourse(Uuid $id, string $name): void
    {
        $course = $this->courseRepository->findById($id);
        if ($course === null)
        {
            throw new CourseNotFoundException($id);
        }
        $course->setName($name);
    }
}