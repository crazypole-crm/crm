<?php
declare(strict_types=1);

namespace App\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\Token\PostAuthenticationGuardToken;

class UserAuthenticator
{
    /** @var UserProviderInterface */
    private $userProvider;
    /** @var TokenStorageInterface */
    private $tokenStorage;

    public function __construct(UserProviderInterface $userProvider, TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
        $this->userProvider = $userProvider;
    }

    public function authenticateUserById(string $userId): TokenInterface
    {
        $securityUser = $this->userProvider->loadUserByUsername($userId);

        $authenticatedToken = new PostAuthenticationGuardToken($securityUser, 'main', $securityUser->getRoles());
        $this->tokenStorage->setToken($authenticatedToken);

        return $authenticatedToken;
    }


    public function logout(Request $request): void
    {
        $this->tokenStorage->setToken(null);
        $request->setSession(null);
    }
}