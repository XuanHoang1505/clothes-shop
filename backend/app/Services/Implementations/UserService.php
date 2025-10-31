<?php
namespace App\Services\Implementations;
use App\Models\User;
use App\Services\Interfaces\UserServiceInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;

class UserService implements UserServiceInterface
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAllUsers()
    {
        return $this->userRepository->getAll();
    }

    public function getUserById(string $id)
    {
        return $this->userRepository->findById($id);
    }

    public function createUser(array $data)
    {
        return $this->userRepository->create($data);
    }

    public function updateUser(User $user, array $data)
    {
        return $this->userRepository->update($user->_id, $data);
    }

    public function deleteUser(User $user)
    {
        return $this->userRepository->delete($user->_id);
    }

    public function register(array $data)
    {
        return $this->userRepository->create($data);
    }
    
}