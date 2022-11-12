<?php
declare(strict_types=1);

namespace App\Controller\User;

use App\Common\Exception\UserNotAuthenticated;
use App\Common\Security\SecurityContextInterface;
use App\Security\UserAuthenticator;
use App\User\Api\ApiInterface;
use App\User\Api\Input\AuthenticateUserInput;
use App\User\Api\Input\ChangeUserPasswordInput;
use App\User\Api\Input\CreateUserInput;
use App\User\App\Data\UserData;
use App\User\Domain\Exception\InvalidUserPasswordException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /** @var ApiInterface */
    private $userApi;
    /** @var SecurityContextInterface */
    private $securityContext;
    /** @var UserAuthenticator */
    private $authenticator;

    public function __construct(ApiInterface $userApi, SecurityContextInterface $securityContext, UserAuthenticator $authenticator)
    {
        $this->userApi = $userApi;
        $this->securityContext = $securityContext;
        $this->authenticator = $authenticator;
    }

    /**
     * @Route("/register")
     */
    public function registerUser(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $input = new CreateUserInput($requestData['email'], md5($requestData['password']));
        $userId = $this->userApi->createUser($input);

        return new Response();
    }

    /**
     * @Route("/logout")
     */
    public function logout(Request $request): void
    {
        $this->authenticator->logout($request);
    }

    /**
     * @Route("/update/user_data")
     */
    public function updateUserData(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        $userData = New UserData(
            $userId,
            $requestData['email'],
            $requestData['firstName'],
            $requestData['middleName'],
            $requestData['lastName'],
            $requestData['phoneNumber'],
            '',
            $requestData['birthday'],
        );
        $this->userApi->updateUserData($userData);
        return new Response();
    }

    /**
     * @Route("/get_all_users")
     */
    public function getAllUsers(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        $userIds = $this->userApi->getAllUsers();
        return new Response(json_encode(['userIds' => $userIds]), Response::HTTP_OK);
    }

    /**
     * @Route("/login")
     */
    public function loginUser(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $input = new AuthenticateUserInput(md5($requestData['password']), $requestData['email']);
        try
        {
            $this->userApi->authenticateUser($input);
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        return new Response();
    }

    /**
     * @Route("/current/user_data")
     */
    public function getCurrentUserData(): Response
    {
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        $userData = $this->userApi->getUserData($userId);
        return new Response($this->serializeUserData($userData));
    }

    /**
     * @Route("/get/users_data")
     */
    public function getUsersData(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $usersData = $this->userApi->getUsersData($requestData['ids']);
        return new Response($this->serializeUsersData($usersData));
    }

    /**
     * @Route("/update/password")
     */
    public function updatePassword(Request $request): Response
    {
        $requestData = json_decode($request->getContent(), true);
        try
        {
            $userId = $this->securityContext->getAuthenticatedUserId();
        }
        catch (UserNotAuthenticated $e)
        {
            return new Response(null, Response::HTTP_UNAUTHORIZED);
        }
        $userData = $this->userApi->getUserData($userId);
        if ($userData === null)
        {
            return new Response(null, Response::HTTP_NOT_FOUND);
        }
        $input = new ChangeUserPasswordInput($requestData['userId'], md5($requestData['newPassword']), md5($requestData['oldPassword']));
        try
        {
            $this->userApi->changeUserPassword($input);
        }
        catch (InvalidUserPasswordException $e)
        {
            return new Response(null, Response::HTTP_BAD_REQUEST);
        }
        return new Response();
    }

    private function serializeUsersData(array $usersData): string
    {
        $data = [];
        foreach ($usersData as $userData)
        {
            $data[] = [
                'id' => $userData->getUserId(),
                'email' => $userData->getEmail(),
                'avatarUrl' => $userData->getAvatarUrl(),
                'phone' => $userData->getPhone(),
                'firstName' => $userData->getFirstName(),
                'middleName' => $userData->getMiddleName(),
                'lastName' => $userData->getLastName(),
                'birthday' => $userData->getBirthday(),
                'lastVisit' => $userData->getLastVisit(),
            ];
        }

        return json_encode($data, JSON_THROW_ON_ERROR);
    }

    private function serializeUserData(UserData $userData): string
    {
        $data = [
            'id' => $userData->getUserId(),
            'email' => $userData->getEmail(),
            'avatarUrl' => $userData->getAvatarUrl(),
            'phone' => $userData->getPhone(),
            'firstName' => $userData->getFirstName(),
            'middleName' => $userData->getMiddleName(),
            'lastName' => $userData->getLastName(),
            'birthday' => $userData->getBirthday(),
            'lastVisit' => $userData->getLastVisit(),
        ];

        return json_encode($data, JSON_THROW_ON_ERROR);
    }
}