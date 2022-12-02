<?php
declare(strict_types=1);

namespace App\Security;

use App\User\Api\Data\Role;
use App\User\Api\ApiInterface as UserApiInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserProvider implements UserProviderInterface
{
    public function __construct(private UserApiInterface $userApi)
    {
    }
    

    public function loadUserByUsername($username): UserInterface
    {
        // Currently this provider supports only user id as username,
        // but it's possible to configure it to use other attributes
        $userData = $this->userApi->getUserData($username);
        if ($userData === null)
        {            
            throw new UsernameNotFoundException("User with id {$username} not found");
        }

        $roles = $this->convertUserRoles([$userData->getRole()]);
        return new SecurityUser($username, $roles);
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

        return new SecurityUser($user->getUserId(), $user->getRoles());
    }

    public function supportsClass($class)
    {
        return SecurityUser::class === $class;
    }

    private function convertUserRoles(array $roles): array
    {
        $callback = function (int $role) {
            return $this->convertUserRole($role);
        };
        return array_map($callback, $roles);
    }

    private function convertUserRole(int $role): string
    {
        return match ($role) 
        {
            Role::CLIENT => SecurityRole::CLIENT,
            Role::TRAINER => SecurityRole::TRAINER,
            Role::ADMIN => SecurityRole::ADMIN,
            default => throw new \InvalidArgumentException('Invalid role type')
        };
    }
}