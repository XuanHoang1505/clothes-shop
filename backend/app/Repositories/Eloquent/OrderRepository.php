<?php
namespace App\Repositories\Eloquent;

use App\Models\Order;
use App\Repositories\Interfaces\OrderRepositoryInterface;
class OrderRepository implements OrderRepositoryInterface 
{
    public function getOrderByEmail(string $email)
    {
        return Order::where('email', $email)->get();
    } 
}
