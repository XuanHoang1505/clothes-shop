<?php
namespace App\Repositories\Eloquent;

use App\Models\Order;
use App\Repositories\Interfaces\OrderRepositoryInterface;
class OrderRepository implements OrderRepositoryInterface 
{
    public function getOrderByEmail(string $email)
    {
       return Order::where('customer_info->email', $email)
                    ->orderBy('created_at', 'desc')->get();
    } 
}