<?php

namespace App\Http\Controllers;
use App\Http\Requests\User\ForgotPasswordRequest;
use App\Http\Requests\User\LoginRequest;
use App\Http\Requests\User\ResetPasswordRequest;
use App\Http\Requests\User\VerifyOtpRequest;
use App\Services\Interfaces\UserServiceInterface;
use Illuminate\Http\JsonResponse;
use App\Http\Resources\UserResource;    
use App\Http\Requests\User\RegisterRequest;
use Tymon\JWTAuth\Facades\JWTAuth;


class AuthController extends Controller
{
    protected $userService;
    public function __construct(UserServiceInterface $userService)
    {
        $this->userService = $userService;
    }

    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->userService->register($request->validated());

        return response()->json($result, 201);
    }

    public function verifyEmailOtp(VerifyOtpRequest $request): JsonResponse
    {
        $data = $request->validated();
        $result = $this->userService->verifyResetPasswordOtp($data['email'], $data['otp']);

        return response()->json($result, $result['success'] ? 200 : 400);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->userService->login($request->validated());

        if (!$result['success']) {
            return response()->json([
                'message' => $result['message'],
            ], 401);
        }

        return response()->json([
            'message' => $result['message'],
            'user' => $result['user'],
            'access_token' => $result['token'],
        ], 200);
    }

    public function logout(): JsonResponse
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'message' => 'Đăng xuất thành công!',
        ], 200);
    }

    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        $result = $this->userService->sendPasswordResetOtp($request->validated()['email']);

        return response()->json($result, $result['success'] ? 200 : 400);
    }

    public function verifyResetPasswordOtp(VerifyOtpRequest $request): JsonResponse
    {
        $data = $request->validated();
        $result = $this->userService->verifyResetPasswordOtp($data['email'], $data['otp']);

        return response()->json($result, $result['success'] ? 200 : 400);
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $data = $request->validated();
        $result = $this->userService->resetPassword($data['email'], $data['new_password']);

        return response()->json($result, $result['success'] ? 200 : 400);
    }

    public function resendOtp(ForgotPasswordRequest $request): JsonResponse
    {
        $result = $this->userService->resendOtp($request->validated()['email']);

        $statusCode = $result['success'] ? 200 : 
            (isset($result['code']) && $result['code'] === 'RATE_LIMIT' ? 429 : 400);

        return response()->json($result, $statusCode);
    }
}
