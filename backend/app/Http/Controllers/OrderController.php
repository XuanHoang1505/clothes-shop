<?php

namespace App\Http\Controllers;

use App\Services\Interfaces\OrderServiceInterface;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderServiceInterface $orderService)
    {
        $this->orderService = $orderService;
    }

    public function getOrderByEmail(Request $request)
    {
        $email = $request->query('email'); // hoặc $request->email nếu gửi body

        $result = $this->orderService->getOrderByEmail($email);

        return response()->json($result);
    }
}
