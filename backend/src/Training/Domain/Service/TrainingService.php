<?php
declare(strict_types=1);

namespace App\Training\Domain\Service;

use App\Common\Domain\Event\EventDispatcherInterface;
use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Training\Domain\Exception\CourseNotFoundException;
use App\Training\Domain\Exception\HallAlreadyHasTrainingAtThisTimeException;
use App\Training\Domain\Exception\HallNotFoundException;
use App\Training\Domain\Exception\NoAvailableRegistrationsException;
use App\Training\Domain\Exception\RegistrationNotFoundException;
use App\Training\Domain\Exception\TrainerAlreadyHaveTrainingAtThisTimeException;
use App\Training\Domain\Exception\TrainingNotFoundException;
use App\Training\Domain\Model\BaseTraining;
use App\Training\Domain\Model\BaseTrainingRepositoryInterface;
use App\Training\Domain\Model\Course;
use App\Training\Domain\Model\CourseRepositoryInterface;
use App\Training\Domain\Model\Event\TrainingCanceledEvent;
use App\Training\Domain\Model\Event\TrainingRescheduledEvent;
use App\Training\Domain\Model\Event\TrainingsRemovedEvent;
use App\Training\Domain\Model\Event\TrainingTrainerChangedEvent;
use App\Training\Domain\Model\Hall;
use App\Training\Domain\Model\HallRepositoryInterface;
use App\Training\Domain\Model\Registration;
use App\Training\Domain\Model\RegistrationRepositoryInterface;
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
        private RegistrationRepositoryInterface $registrationRepository,
        private EventDispatcherInterface $dispatcher,
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
        ?int $maxRegistrations
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
        $intersectingTrainings = $this->trainingRepository->findIntersectingTrainingsByTrainerId($startDate, $endDate, $trainerId);
        if ($intersectingTrainings)
        {
            throw new TrainerAlreadyHaveTrainingAtThisTimeException();
        }
        $intersectingTrainings = $this->trainingRepository->findIntersectingTrainingsByHallId($startDate, $endDate, $hallId);
        if ($intersectingTrainings)
        {
            throw new HallAlreadyHasTrainingAtThisTimeException();
        }
        $baseTraining = new BaseTraining(
            new Uuid(UuidGenerator::generateUuid()),
            $startDate,
            $endDate,
            $hallId,
            $courseId,
            $trainerId,
            $type,
            $maxRegistrations
        );
        $this->baseTrainingRepository->add($baseTraining);
        if ($isRepeatable)
        {
            for ($i = 0; $i < self::WEEKS_IN_YEAR; $i++)
            {
                $training = new Training($baseTraining->getId(),
                    new Uuid(UuidGenerator::generateUuid()),
                    $title === '' ? $course->getName() : $title,
                    $description ?? '',
                    $i !== 0 ? $startDate->add(new \DateInterval('P' . $i . 'W')) : $startDate,
                    $i !== 0 ? $endDate->add(new \DateInterval('P' . $i . 'W')) : $endDate,
                    $hallId,
                    $courseId,
                    $trainerId,
                    $type,
                    $maxRegistrations
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
                $maxRegistrations
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
     * @throws TrainingNotFoundException|TrainerAlreadyHaveTrainingAtThisTimeException|HallAlreadyHasTrainingAtThisTimeException
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
        ?int $maxRegistrations = null
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
        $intersectingTrainings = $this->trainingRepository->findIntersectingTrainingsByTrainerId($startDate, $endDate, $trainerId);
        if ($intersectingTrainings)
        {
            throw new TrainerAlreadyHaveTrainingAtThisTimeException();
        }
        $intersectingTrainings = $this->trainingRepository->findIntersectingTrainingsByHallId($startDate, $endDate, $hallId);
        if ($intersectingTrainings)
        {
            throw new HallAlreadyHasTrainingAtThisTimeException();
        }
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
        if ($maxRegistrations !== null)
        {
            $baseTraining->setMaxRegistrations($maxRegistrations);
        }
        $i = 0;
        foreach ($trainings as $training)
        {
            $training->setName($title);
            $training->setStartDate($i !== 0 ? $startDate->add(new \DateInterval('P' . $i . 'W')) : $startDate);
            $training->setEndDate($i !== 0 ? $startDate->add(new \DateInterval('P' . $i . 'W')) : $startDate);
            if ($description !== null)
            {
                $training->setDescription($description);
            }
            $training->setCourseId($courseId);
            $training->setHallId($hallId);
            $training->setTrainerId($trainerId);
            if ($maxRegistrations !== null)
            {
                $training->setMaxRegistrations($maxRegistrations);
            }
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
        $this->dispatcher->dispatch(new TrainingTrainerChangedEvent($trainingId, $training->getName(), $training->getStartDate()));
    }

    public function changeChangeTrainingTime(Uuid $trainingId, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate): void
    {
        $training = $this->trainingRepository->findById($trainingId);
        if ($training === null)
        {
            throw new TrainingNotFoundException($trainingId);
        }
        $intersectingTrainings = $this->trainingRepository->findIntersectingTrainingsByTrainerId($startDate, $endDate, $training->getTrainerId());
        if ($intersectingTrainings)
        {
            throw new TrainerAlreadyHaveTrainingAtThisTimeException();
        }
        $intersectingTrainings = $this->trainingRepository->findIntersectingTrainingsByHallId($startDate, $endDate, $training->getHallId());
        if ($intersectingTrainings)
        {
            throw new HallAlreadyHasTrainingAtThisTimeException();
        }
        $oldStartDate = $training->getStartDate();

        $training->setStartDate($startDate);
        $training->setEndDate($endDate);
        $this->dispatcher->dispatch(new TrainingRescheduledEvent($trainingId, $training->getName(), $startDate, $oldStartDate));
    }

    public function changeTrainingStatus(Uuid $trainingId, bool $isCanceled): void
    {
        $training = $this->trainingRepository->findById($trainingId);
        if ($training === null)
        {
            throw new TrainingNotFoundException($trainingId);
        }
        $training->setIsCanceled($isCanceled);
        if ($isCanceled)
        {
            $this->dispatcher->dispatch(new TrainingCanceledEvent($trainingId, $training->getName(), $training->getStartDate()));
        }
    }

    /**
     * @param Uuid $baseId
     */
    public function removeBaseTraining(Uuid $baseId): void
    {
        $trainings = $this->trainingRepository->findAllByBaseTraining($baseId);
        $this->removeTrainings($trainings);
        $baseTraining = $this->baseTrainingRepository->findById($baseId);
        if ($baseTraining === null)
        {
            throw new TrainingNotFoundException($baseId);
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
        $this->removeTrainings([$training]);
    }

    /**
     * @param Uuid[] $hallIds
     */
    public function removeHalls(array $hallIds): void
    {
        $trainings = $this->trainingRepository->findAllByHallIds($hallIds);
        $this->removeTrainings($trainings);
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
        $this->removeTrainings($trainings);
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

    public function removeTrainingsByTrainer(Uuid $trainerId): void
    {
        $trainings = $this->trainingRepository->findAllByTrainerId($trainerId);
        $this->removeTrainings($trainings);
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

    public function createRegistration(Uuid $trainingId, Uuid $userId): Uuid
    {
        $registration = new Registration(
            new Uuid(UuidGenerator::generateUuid()),
            $trainingId,
            $userId
        );

        $training = $this->trainingRepository->findById($trainingId);
        if ($training === null)
        {
            throw new TrainingNotFoundException($trainingId);
        }
        
        $registrationsCount = $this->registrationRepository->countRegistrationsByTrainingId($trainingId);
        if ($registrationsCount >= $training->getMaxRegistrations())
        {
            throw new NoAvailableRegistrationsException($training->getId());
        }

        $this->registrationRepository->add($registration);
        return $registration->getId();
    }

    public function removeRegistration(Uuid $registrationId): void
    {
        $registration = $this->registrationRepository->findOneById($registrationId);
        if ($registration === null)
        {
            throw new RegistrationNotFoundException($registrationId);
        }

        $this->registrationRepository->remove($registration);
    }

    public function changeRegistrationStatus(Uuid $registrationId, int $status): void
    {
        $registration = $this->registrationRepository->findOneById($registrationId);
        if ($registration === null)
        {
            throw new RegistrationNotFoundException($registrationId);
        }

        $registration->setStatus($status);
    }

    /**
     * @param Training[] $trainings
     */
    private function removeTrainings(array $trainings): void
    {
        foreach ($trainings as $training)
        {
            $this->trainingRepository->remove($training);
        }
        $this->dispatcher->dispatch(new TrainingsRemovedEvent(array_map(
            static function(Training $training): Uuid {
                return $training->getId();
            }, $trainings
        )));
    }
}