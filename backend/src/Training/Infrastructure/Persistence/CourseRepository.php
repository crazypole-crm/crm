<?php
declare(strict_types=1);

namespace App\Training\Infrastructure\Persistence;

use App\Common\Domain\Uuid;
use App\Training\Domain\Model\Course;
use App\Training\Domain\Model\CourseRepositoryInterface;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ObjectRepository;

class CourseRepository implements CourseRepositoryInterface
{
    private EntityRepository|ObjectRepository $repo;
    private EntityManager $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
        $this->repo = $em->getRepository(Course::class);
    }

    public function findById(Uuid $courseId): ?Course
    {
        return $this->repo->findOneBy(['id' => $courseId]);
    }

    public function add(Course $course): void
    {
        $this->em->persist($course);
    }

    public function remove(Course $course): void
    {
        $this->em->remove($course);
    }
}