<?php

namespace App\Http\Controllers;
use App\Services\Interfaces\UserServiceInterface;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;    
use App\Http\Requests\User\RegisterRequest;


use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $userService;
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->userService->register($request->validated());

        return response()->json([
            'message' => 'Đăng ký thành công!',
            'data'    => new UserResource($user),
        ], 201);
    }
}
