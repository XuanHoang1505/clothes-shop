<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements JWTSubject
{
    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];

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
