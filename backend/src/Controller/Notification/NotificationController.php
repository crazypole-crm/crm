<?php
declare(strict_types=1);

namespace App\Controller\Notification;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Notification\Api\ApiInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class NotificationController extends AbstractController
{

    public function __construct(private SecurityContextInterface $securityContext, private ApiInterface $notificationApi)
    {
    }

    /**
     * @Route("/notify")
     */
    public function notifyUsers(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $this->securityContext->getAuthenticatedUserId();
            $title = $requestData['title'] ?? null;
            $body = $requestData['body'] ?? null;
            $role = $requestData['role'] ?? null;
            $this->notificationApi->notifyUsers($title, $body, $role);

            return new Response('', Response::HTTP_OK);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
    }
}