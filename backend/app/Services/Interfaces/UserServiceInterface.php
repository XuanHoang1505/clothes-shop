<?php
namespace App\Services\Interfaces;
use App\Models\User;
interface UserServiceInterface
{
    public function getAllUsers();
    public function getUserById(string $id);
    public function createUser(array $data);
    public function updateUser(User $user, array $data); 
    public function deleteUser(User $user); 
    public function register(array $data);
}