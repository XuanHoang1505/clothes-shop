<?php
namespace App\Services\Implementations;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Notifications\SendOtpNotification;
use App\Services\Interfaces\UserServiceInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\OtpService;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;


class UserService implements UserServiceInterface
{
    protected $userRepository;
    protected $otpService;

    public function __construct(UserRepositoryInterface $userRepository, OtpService $otpService)
    {
        $this->userRepository = $userRepository;
        $this->otpService = $otpService;
    }

    public function getAllUsers()
    {
        return $this->userRepository->getAll();
    }

    public function getUserById(string $id)
    {
        return $this->userRepository->findById($id);
    }

    public function createUser(array $data)
    {
        return $this->userRepository->create($data);
    }

    public function updateUser(User $user, array $data)
    {
        return $this->userRepository->update($user->_id, $data);
    }

    public function deleteUser(User $user)
    {
        return $this->userRepository->delete($user->_id);
    }

    public function register(array $data)
    {
        return $this->userRepository->create($data);
    }

    public function login(array $credentials)
    {
        $user = $this->userRepository->findByEmail($credentials['email']);

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return [
                'success' => false,
                'message' => 'Password or email is incorrect',
            ];
        }

        $token = JWTAuth::fromUser($user);

        return [
            'success' => true,
            'message' => 'Login successful',
            'user' => new UserResource($user),
            'token' => $token,
        ];
    }

    public function sendPasswordResetOtp(string $email): array
    {
        if(!$this->userRepository->emailExists($email)) {
            return [
                'success' => false,
                'message' => 'Email không tồn tại trong hệ thống',
            ];
        }

        if (!$this->otpService->canResend($email)) {
            return [
                'success' => false,
                'message' => 'Vui lòng đợi 1 phút trước khi gửi lại OTP',
                'code' => 'RATE_LIMIT'
            ];
        }

        $user = $this->userRepository->findByEmail($email);
        $otp = $this->otpService->generate($email);
        $this->otpService->setResendLimit($email);

        $user->notify(new SendOtpNotification($otp));

        return [
            'success' => true,
            'message' => 'Mã OTP đã được gửi đến email của bạn',
            'data' => [
                'expires_in_minutes' => config('otp.expiry_minutes'),
                'max_attempts' => config('otp.max_attempts')
            ]
        ];
    }

    public function verifyOtp(string $email, string $otp): array
    {
        if(!$this->userRepository->emailExists($email)) {
            return [
                'success' => false,
                'message' => 'Email không tồn tại trong hệ thống',
            ];
        }

        if (!$this->otpService->exists($email)) {
            return [
                'success' => false,
                'message' => 'OTP không tồn tại hoặc đã hết hạn'
            ];
        }

        $remainingAttempts = $this->otpService->getRemainingAttempts($email);

        // Xác thực OTP
        $isValid = $this->otpService->verify($email, $otp);

        if (!$isValid) {
            $newRemaining = $this->otpService->getRemainingAttempts($email);

            return [
                'success' => false,
                'message' => $newRemaining > 0 
                    ? "OTP không hợp lệ. Còn {$newRemaining} lần thử."
                    : 'OTP không hợp lệ. Vui lòng yêu cầu OTP mới.',
                'data' => [
                    'remaining_attempts' => $newRemaining
                ]
            ];
        }

        return [
            'success' => true,
            'message' => 'OTP hợp lệ. Vui lòng nhập mật khẩu mới.',
            'data' => [
                'email' => $email
            ]
        ];
    }

    public function resetPassword(string $email, string $newPassword): array
    {
        // Kiểm tra email
        $user = $this->userRepository->findByEmail($email);
        if (!$user) {
            return [
                'success' => false,
                'message' => 'Email không tồn tại'
            ];
        }


        // Kiểm tra OTP đã được verified chưa
        if (!$this->otpService->isVerified($email)) {
            return [
                'success' => false,
                'message' => 'Vui lòng verify OTP trước khi đặt lại mật khẩu'
            ];
        }
        // Cập nhật mật khẩu
        $updated = $this->userRepository->updatePassword($user->id, $newPassword);

        if (!$updated) {
            return [
                'success' => false,
                'message' => 'Không thể cập nhật mật khẩu. Vui lòng thử lại.'
            ];
        }

        // Xóa OTP sau khi reset thành công
        $this->otpService->delete($email);

        return [
            'success' => true,
            'message' => 'Mật khẩu đã được đặt lại thành công'
        ];
    }

    public function resendOtp(string $email): array
    {
        // Kiểm tra email
        if (!$this->userRepository->emailExists($email)) {
            return [
                'success' => false,
                'message' => 'Email không tồn tại'
            ];
        }

        // Kiểm tra rate limit
        if (!$this->otpService->canResend($email)) {
            return [
                'success' => false,
                'message' => 'Vui lòng đợi 1 phút trước khi gửi lại OTP',
                'code' => 'RATE_LIMIT'
            ];
        }

        $user = $this->userRepository->findByEmail($email);

        // Xóa OTP cũ và tạo mới
        $this->otpService->delete($email);
        $otp = $this->otpService->generate($email);

        // Set rate limit
        $this->otpService->setResendLimit($email);

        // Gửi OTP
        $user->notify(new SendOtpNotification($otp));

        return [
            'success' => true,
            'message' => 'Mã OTP mới đã được gửi'
        ];
    }
}
