<?php
declare(strict_types=1);

namespace App\Controller\Event;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Training\Api\ApiInterface;
use App\Training\Api\Input\CreateTrainingInput;
use App\Training\Api\Input\EditTrainingInput;
use App\Training\App\Query\ListTrainingInput;
use App\Training\Domain\Model\TrainingType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EventController extends AbstractController
{
    /** @var ApiInterface */
    private $eventApi;
    /** @var SecurityContextInterface */
    private $securityContext;

    public function __construct(ApiInterface $eventApi, SecurityContextInterface $securityContext)
    {
        $this->eventApi = $eventApi;
        $this->securityContext = $securityContext;
    }

    /**
     * @Route("/create/training")
     */
    public function createTraining(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $startDate = (new \DateTimeImmutable())->setTimestamp($requestData['startDate'] / 1000);
            $endDate = (new \DateTimeImmutable())->setTimestamp($requestData['endDate'] / 1000);
            $type = $this->convertTrainingType($requestData['type']);
            $input = new CreateTrainingInput("", $requestData['description'] ?? null, $startDate, $endDate, $requestData['hallId'], $requestData['courseId'], $requestData['trainerId'], $type, $requestData['isRepeatable']);
            $trainingId = $this->eventApi->createTraining($input);
            return new Response(json_encode(['trainingId' => $trainingId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/training")
     */
    public function editBaseTraining(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $startDate = (new \DateTimeImmutable())->setTimestamp($requestData['startDate'] / 1000);
            $endDate = (new \DateTimeImmutable())->setTimestamp($requestData['endDate'] / 1000);
            $type = $this->convertTrainingType($requestData['type']);
            $input = new EditTrainingInput($requestData['baseId'], $requestData['trainingId'],"", $requestData['description'] ?? null, $startDate, $endDate, $requestData['hallId'], $requestData['courseId'], $requestData['trainerId'], $type);
            $this->eventApi->editTraining($input);

            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/training/trainer")
     */
    public function changeTrainingTrainer(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $this->eventApi->changeTrainingTrainer($requestData['trainingId'], $requestData['trainerId']);

            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/training/time")
     */
    public function changeTrainingTime(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $startDate = (new \DateTimeImmutable())->setTimestamp($requestData['startDate'] / 1000);
            $endDate = (new \DateTimeImmutable())->setTimestamp($requestData['endDate'] / 1000);
            $this->eventApi->changeTrainingTime($requestData['trainingId'], $startDate, $endDate);

            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/training/status")
     */
    public function changeTrainingStatus(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $this->eventApi->changeTrainingStatus($requestData['trainingId'], $requestData['isCanceled']);

            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/remove/base_training")
     */
    public function removeBaseTraining(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $baseId = $requestData['baseId'];
            $this->eventApi->removeTrainingsByBase($baseId);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/remove/training")
     */
    public function removeTraining(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $trainingId = $requestData['trainingId'];
            $this->eventApi->removeTraining($trainingId);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/remove/courses")
     */
    public function removeCourses(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $courseIds = $requestData['courseIds'];
            $this->eventApi->removeCourses($courseIds);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/remove/halls")
     */
    public function removeHalls(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $hallsId = $requestData['hallId'];
            $name = $requestData['name'];
            $capacity = $requestData['capacity'];
            $this->eventApi->editHall($hallsId, $name, $capacity);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/course")
     */
    public function editCourse(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $hallsId = $requestData['courseId'];
            $name = $requestData['name'];
            $this->eventApi->editCourse($hallsId, $name);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/hall")
     */
    public function editHall(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();

            $hallId = $requestData['hallId'];
            $name = $requestData['name'];
            $capacity = $requestData['capacity'];
            $this->eventApi->editHall($hallId, $name, $capacity);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }


    /**
     * @Route("/list/trainings")
     */
    public function listTrainings(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $startDate = $requestData['startDate'] ?? null;
            $endDate = $requestData['endDate'] ?? null;
            $trainingIds = $requestData['trainingIds'] ?? null;
            $trainings = $this->eventApi->listTrainings(
                new ListTrainingInput(
                    (new \DateTimeImmutable())->setTimestamp($startDate === null ? null : (int)$startDate / 1000),
                    (new \DateTimeImmutable())->setTimestamp($endDate === null ? null : (int)$endDate / 1000),
                    $trainingIds)
            );
            return new Response(json_encode($trainings, JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/list/courses")
     */
    public function listCourses(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $courses = $this->eventApi->listCourses();
            return new Response(json_encode($courses, JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/create/hall")
     */
    public function createHall(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $hallId = $this->eventApi->createHall($requestData['name'], $requestData['capacity']);
            return new Response(json_encode(['hallId' => $hallId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
    * @Route("/list/halls")
    */
    public function listHalls(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $halls = $this->eventApi->listHalls();
            return new Response(json_encode($halls, JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/create/course")
     */
    public function createCourse(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $courseId = $this->eventApi->createCourse($requestData['name']);
            return new Response(json_encode(['courseId' => $courseId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    private function convertTrainingType(string $type): int
    {
        return match ($type)
        {
            'group' => TrainingType::GROUP_TRAINING,
            'individual' => TrainingType::INDIVIDUAL_TRAINING,
        };
    }
}