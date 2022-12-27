<?php
declare(strict_types=1);

namespace App\Controller\Training;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Training\Api\ApiInterface;
use App\Training\Api\Input\CreateTrainingInput;
use App\Training\Api\Input\EditTrainingInput;
use App\Training\App\Query\ListTrainingInput;
use App\Training\Domain\Exception\HallAlreadyHasTrainingAtThisTimeException;
use App\Training\Domain\Exception\TrainerAlreadyHaveTrainingAtThisTimeException;
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
            $input = new CreateTrainingInput(
                "", 
                $requestData['description'] ?? null, 
                $startDate, 
                $endDate, 
                $requestData['hallId'], 
                $requestData['courseId'], 
                $requestData['trainerId'], 
                $type, 
                $requestData['isRepeatable'],
                $requestData['maxRegistrationsCount'] ?? null
            );
            $trainingId = $this->eventApi->createTraining($input);
            return new Response(json_encode(['trainingId' => $trainingId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        catch (TrainerAlreadyHaveTrainingAtThisTimeException)
        {
            return new Response(json_encode([
                'code' => 'trainers_time_intersection',
            ], JSON_THROW_ON_ERROR), Response::HTTP_BAD_REQUEST);
        }
        catch (HallAlreadyHasTrainingAtThisTimeException)
        {
            return new Response(json_encode([
                'code' => 'halls_time_intersection',
            ], JSON_THROW_ON_ERROR), Response::HTTP_BAD_REQUEST);
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
            $input = new EditTrainingInput(
                $requestData['baseId'], 
                $requestData['trainingId'],
                "", 
                $requestData['description'] ?? null, 
                $startDate, 
                $endDate, 
                $requestData['hallId'], 
                $requestData['courseId'], 
                $requestData['trainerId'], 
                $requestData['maxRegistrationsCount'] ?? null);
            $this->eventApi->editTraining($input);

            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        catch (TrainerAlreadyHaveTrainingAtThisTimeException)
        {
            return new Response(json_encode([
                'code' => 'trainers_time_intersection',
            ], JSON_THROW_ON_ERROR), Response::HTTP_BAD_REQUEST);
        }
        catch (HallAlreadyHasTrainingAtThisTimeException)
        {
            return new Response(json_encode([
                 'code' => 'halls_time_intersection',
            ], JSON_THROW_ON_ERROR), Response::HTTP_BAD_REQUEST);
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
        catch (TrainerAlreadyHaveTrainingAtThisTimeException)
        {
            return new Response(json_encode([
                'code' => 'trainers_time_intersection'
            ], JSON_THROW_ON_ERROR), Response::HTTP_BAD_REQUEST);
        }
        catch (HallAlreadyHasTrainingAtThisTimeException)
        {
            return new Response(json_encode([
                 'code' => 'halls_time_intersection',
            ], JSON_THROW_ON_ERROR), Response::HTTP_BAD_REQUEST);
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
            $hallIds = $requestData['hallsIds'];
            $this->eventApi->removeHalls($hallIds);
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

    /**
     * @Route("/training/{trainingId}/registration/add")
     */
    public function createRegistration(Request $request, string $trainingId): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $requestData['userId'];
            $registrationId = $this->eventApi->createRegistration($trainingId, $userId);
            return new Response(json_encode(['registrationId' => $registrationId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/training/registration/{registrationId}/changeStatus")
     */
    public function changeRegistrationStatus(Request $request, string $registrationId): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $status = $requestData['status'];
            $this->eventApi->changeRegistrationStatus($registrationId, $status);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/training/registration/{registrationId}/remove")
     */
    public function removeRegistration(string $registrationId): Response
    {
        try
        {
            $this->eventApi->removeRegistration($registrationId);
            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /** @Route("/training/{trainingId}/registrations/list") */
    public function listTrainingRegistrations(string $trainingId): Response
    {
        try
        {
            $registrations = $this->eventApi->listRegistrationsByTrainingId($trainingId);
            return new Response(json_encode($registrations, JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /** @Route("/training/registration/cur-user") */
    public function listCurrentUserRegistrations(): Response
    {
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $registrations = $this->eventApi->listRegistrationsByUserId($userId);
            return new Response(json_encode($registrations, JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**  @Route("/training/{trainingId}/registration/register")*/
    public function createCurUserRegistration(string $trainingId): Response
    {
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $registrationId = $this->eventApi->createRegistration($trainingId, $userId);
            return new Response(json_encode(['registrationId' => $registrationId]), Response::HTTP_OK);
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