<?php
declare(strict_types=1);

namespace App\Security;

use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserProvider implements UserProviderInterface
{
    public function loadUserByUsername($username): UserInterface
    {
        // Currently this provider supports only user id as username,
        // but it's possible to configure it to use other attributes
//        $userData = $this->userApi->getUserData($username);
//        if ($userData === null)
//        {
//            throw new UsernameNotFoundException("User with id {$username} not found");
//        }

        return new SecurityUser($username);
    }

    /**
     * @param UserInterface $user
     * @return UserInterface
     */
    public function refreshUser(UserInterface $user)
    {
        if (!$user instanceof SecurityUser)
        {
            throw new UnsupportedUserException(sprintf('Invalid user class "%s".', get_class($user)));
        }

        return new SecurityUser($user->getUserId());
    }

    public function supportsClass($class)
    {
        return SecurityUser::class === $class;
    }
}