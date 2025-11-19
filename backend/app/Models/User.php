<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use MongoDB\Laravel\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements JWTSubject
{
    use Notifiable;
    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        'email',
        'password',
        'fullName',
        'status',
        'role',
        'phoneNumber',
        'gender',
        'avatar',
        'isVerified',
    ];

    protected $hidden = [
        'password',
    ];

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function getJWTIdentifier()
    {
        // Trả về khóa định danh của user (thường là _id với MongoDB)
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        // Trả về thêm các thông tin custom muốn đưa vào token (nếu có)
        return [];
    }

}
