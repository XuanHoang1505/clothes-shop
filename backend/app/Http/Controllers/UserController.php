<?php

namespace App\Http\Controllers;
use App\Services\Interfaces\UserServiceInterface;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;


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

    public function store(Request $request)
    {
        $user = $this->userService->createUser($request->validated());
        return (new UserResource($user))
            ->response()
            ->setStatusCode(201);
    }
    public function update(Request $request, User $user)
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

}
