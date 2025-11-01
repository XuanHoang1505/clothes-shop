<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class OtpService
{
    protected $otpLength;
    protected $expiryMinutes;
    protected $maxAttempts;
    
    public function __construct()
    {
        $this->otpLength = config('otp.length', 6);
        $this->expiryMinutes = config('otp.expiry_minutes', 5);
        $this->maxAttempts = config('otp.max_attempts', 3);
    }

    /**
     * Tạo OTP mới cho email
     */
    public function generate(string $email): string
    {
        // Tạo OTP ngẫu nhiên
        $otp = str_pad(
            random_int(0, pow(10, $this->otpLength) - 1), 
            $this->otpLength, 
            '0', 
            STR_PAD_LEFT
        );

        // Lưu vào cache với TTL
        $key = $this->getOtpKey($email);
        Cache::put($key, [
            'otp' => $otp,
            'attempts' => 0,
            'created_at' => Carbon::now()->toDateTimeString()
        ], now()->addMinutes($this->expiryMinutes));

        return $otp;
    }

    /**
     * Xác thực OTP
     */
    public function verify(string $email, string $otp): bool
    {
        $key = $this->getOtpKey($email);
        $data = Cache::get($key);

        if (!$data) {
            return false; // OTP không tồn tại hoặc đã hết hạn
        }

        // Kiểm tra số lần thử
        if ($data['attempts'] >= $this->maxAttempts) {
            Cache::forget($key);
            return false;
        }

        // Tăng số lần thử
        $data['attempts']++;
        Cache::put($key, $data, now()->addMinutes($this->expiryMinutes));

        // Kiểm tra OTP
        if ($data['otp'] === $otp) {
            Cache::forget($key); // Xóa OTP sau khi verify thành công
            return true;
        }

        return false;
    }

    /**
     * Kiểm tra OTP có tồn tại không (không tăng attempts)
     */
    public function exists(string $email): bool
    {
        return Cache::has($this->getOtpKey($email));
    }

    /**
     * Xóa OTP
     */
    public function delete(string $email): void
    {
        Cache::forget($this->getOtpKey($email));
    }

    /**
     * Lấy thông tin OTP (để debug)
     */
    public function getInfo(string $email): ?array
    {
        $data = Cache::get($this->getOtpKey($email));
        
        if (!$data) {
            return null;
        }

        return [
            'created_at' => $data['created_at'],
            'attempts' => $data['attempts'],
            'max_attempts' => $this->maxAttempts,
            'expires_in' => Cache::get($this->getOtpKey($email)) 
                ? 'Còn ' . now()->diffInMinutes(now()->addMinutes($this->expiryMinutes)) . ' phút'
                : 'Đã hết hạn'
        ];
    }

    /**
     * Kiểm tra rate limit cho resend
     */
    public function canResend(string $email): bool
    {
        $key = $this->getResendKey($email);
        return !Cache::has($key);
    }

    /**
     * Set rate limit cho resend (1 phút)
     */
    public function setResendLimit(string $email): void
    {
        $key = $this->getResendKey($email);
        Cache::put($key, true, now()->addMinute());
    }

    /**
     * Lấy thời gian còn lại trước khi có thể resend
     */
    public function getResendCooldown(string $email): int
    {
        $key = $this->getResendKey($email);
        $ttl = Cache::get($key);
        return $ttl ? 60 : 0; // seconds
    }

    /**
     * Key cho OTP trong cache
     */
    protected function getOtpKey(string $email): string
    {
        return 'otp:' . md5(strtolower($email));
    }

    /**
     * Key cho resend rate limit
     */
    protected function getResendKey(string $email): string
    {
        return 'otp:resend:' . md5(strtolower($email));
    }

    /**
     * Lấy số lần thử còn lại
     */
    public function getRemainingAttempts(string $email): int
    {
        $data = Cache::get($this->getOtpKey($email));
        
        if (!$data) {
            return $this->maxAttempts;
        }

        return max(0, $this->maxAttempts - $data['attempts']);
    }
}