<?php
declare(strict_types=1);

namespace App\Event\Domain\Service;

use App\Common\Domain\Uuid;
use App\Common\Domain\UuidGenerator;
use App\Event\Domain\Exception\EventNotFoundException;
use App\Event\Domain\Model\Training;
use App\Event\Domain\Model\TrainingRepositoryInterface;

class EventService
{
    /** @var TrainingRepositoryInterface */
    private $repository;

    public function __construct(TrainingRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function createTraining(string $title, \DateTimeImmutable $startDate, \DateTimeImmutable $endDate, Uuid $courseId, ?string $description, ?Uuid $trainerId): Uuid
    {
        $event = new Training(new Uuid(UuidGenerator::generateUuid()), $title, $description, $startDate, $endDate, $place, $organizerId, null, false);
        $this->repository->add($event);
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
        $event = $this->repository->findEventById(new Uuid($eventId));
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
        $event = $this->repository->findEventById(new Uuid($eventId));
        if ($event === null)
        {
            throw new EventNotFoundException($eventId);
        }
        $this->repository->remove($event);
    }
}