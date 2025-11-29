<?php
namespace App\Services\Interfaces;

interface OrderServiceInterface
{
    public function getOrderByEmail(string $email);
}