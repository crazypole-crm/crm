<?php
declare(strict_types=1);

namespace App\Controller\Event;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Training\Api\ApiInterface;
use App\Training\Api\Input\CreateEventInput;
use App\Training\Api\Input\EditEventInput;
use App\Training\App\Query\ListTrainingInput;
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
     * @Route("/create/event")
     */
    public function createEvent(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $startDate = (new \DateTimeImmutable())->setTimestamp($requestData['startDate'] / 1000);
            $endDate = (new \DateTimeImmutable())->setTimestamp($requestData['endDate'] / 1000);
            $input = new CreateEventInput($requestData['title'], $requestData['description'], $startDate, $endDate, $userId, $requestData['place']);
            $eventId = $this->eventApi->createEvent($input);
            $this->eventApi->inviteUsers($requestData['userIds'], $eventId);
            return new Response(json_encode(['eventId' => $eventId]), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/events")
     */
    public function getCurrentUserEventData(Request $request): Response
    {
        //TODO обработка исключений
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $events = $this->eventApi->getEventsDataByUserId($userId);

            return new Response(json_encode($events), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/edit/event")
     */
    public function editEvent(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $startDate = (new \DateTimeImmutable())->setTimestamp($requestData['startDate'] / 1000);
            $endDate = (new \DateTimeImmutable())->setTimestamp($requestData['endDate'] / 1000);
            $input = new EditEventInput($requestData['eventId'], $requestData['title'], $requestData['description'], $startDate, $endDate, $userId, $requestData['place']);
            $this->eventApi->editEvent($input);
            $this->eventApi->inviteUsers($requestData['userIds'], $requestData['eventId']);

            return new Response(null, Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }

    /**
     * @Route("/remove/event")
     */
    public function removeEvent(Request $request): Response
    {
        //TODO обработка исключений
        $requestData = json_decode($request->getContent(), true);
        //TODO добавить права и проверку
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
            $eventId = $requestData['eventId'];
            $event = $this->eventApi->getEventDataById($eventId);
            if ($event->getTrainerId() !== $userId)
            {
                return new Response(null, Response::HTTP_FORBIDDEN);
            }
            $this->eventApi->removeEvent($eventId);
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
                new ListTrainingInput($startDate, $endDate, $trainingIds)
            );
            return new Response(json_encode($trainings, JSON_THROW_ON_ERROR), Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }
}