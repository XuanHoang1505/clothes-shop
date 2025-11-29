<?php

namespace App\Services\Implementations;

use App\Repositories\Interfaces\OrderRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Interfaces\OrderServiceInterface;

class OrderService implements OrderServiceInterface
{
    protected $orderRepository;
    protected $userRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        UserRepositoryInterface $userRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->userRepository = $userRepository;
    }

    public function getOrderByEmail(string $email)
    {
        // Kiểm tra user có tồn tại không
        $user = $this->userRepository->findByEmail($email);

        if (!$user) {
            return [
                'success' => false,
                'message' => 'Email này không tồn tại trong hệ thống.',
                'orders'  => []
            ];
        }

        // Lấy danh sách đơn hàng theo email
        $orders = $this->orderRepository->getOrderByEmail($email);

        return [
            'success' => true,
            'message' => 'Lấy đơn hàng thành công.',
            'orders'  => $orders
        ];
    }
}
