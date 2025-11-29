<?php
namespace App\Repositories\Interfaces;

interface OrderRepositoryInterface
{
    // public function getAll(int $page = 1, int $perPage = 15);
    // public function findById(string $id);
    // public function create(array $data);
    // public function update(string $id, array $data);
    // public function delete(string $id);
    // public function forceDelete(string $id);
    // public function getOrdersByUserId(string $userId, int $page = 1, int $perPage = 15);
    public function getOrderByEmail(string $email);
    // public function updateStatus(string $id, string $status);
}