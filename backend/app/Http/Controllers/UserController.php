<?php

namespace App\Http\Controllers;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Services\Interfaces\UserServiceInterface;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Container\Attributes\Log;
use PgSql\Lob;

class UserController extends Controller
{
    protected $userService;
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $users = $this->userService->getAllUsers();
        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function store(CreateUserRequest $request)
    {
        $user = $this->userService->createUser($request->validated());
        return (new UserResource($user))
            ->response()
            ->setStatusCode(201);
    }
    public function update(UpdateUserRequest $request, User $user)
    {
        $updatedUser = $this->userService->updateUser($user, $request->validated());
        return new UserResource($updatedUser);
    }

    public function destroy(User $user)
    {
        $this->userService->deleteUser($user);
        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
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
