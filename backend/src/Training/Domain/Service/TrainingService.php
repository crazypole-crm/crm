<?php
declare(strict_types=1);

namespace App\Training\Domain\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Training\Domain\Exception\EventNotFoundException;
use App\Training\Domain\Model\Course;
use App\Training\Domain\Model\CourseRepositoryInterface;
use App\Training\Domain\Model\Hall;
use App\Training\Domain\Model\HallRepositoryInterface;
use App\Training\Domain\Model\Training;
use App\Training\Domain\Model\TrainingRepositoryInterface;

class TrainingService
{
    public function __construct(
        private TrainingRepositoryInterface $trainingRepository,
        private HallRepositoryInterface $hallRepository,
        private CourseRepositoryInterface $courseRepository,
    ){}

    public function createTraining(string $title, ?string $description, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, Uuid $courseId, Uuid $trainerId, Uuid $hallId, int $type): Uuid
    {
        $event = new Training(new Uuid(UuidGenerator::generateUuid()), $title, $description, $startDate, $endDate, $hallId, $courseId, $trainerId, $type);
        $this->trainingRepository->add($event);
        return $event->getId();
    }

    /**
     * @param string $eventId
     * @param string $title
     * @param \DateTimeImmutable $startDate
     * @param \DateTimeImmutable $endDate
     * @param Uuid $organizerId
     * @param string|null $description
     * @param string|null $place
     * @throws EventNotFoundException
     */
    public function editEvent(string $eventId, string $title, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, Uuid $organizerId, ?string $description, ?string $place): void
    {
        $event = $this->trainingRepository->findHallById(new Uuid($eventId));
        if ($event === null)
        {
            throw new EventNotFoundException($eventId);
        }
        $event->setName($title);
        $event->setStartDate($startDate);
        $event->setEndDate($endDate);
        $event->setOrganizerId($organizerId);
        $event->setDescription($description);
        $event->setPlace($place);
    }

    /**
     * @param string $eventId
     * @throws EventNotFoundException
     */
    public function removeEvent(string $eventId)
    {
        $event = $this->trainingRepository->findHallById(new Uuid($eventId));
        if ($event === null)
        {
            throw new EventNotFoundException($eventId);
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