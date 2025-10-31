<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $collection = 'users'; // Tên collection trong MongoDB
    protected $connection = 'mongodb'; // Kết nối bạn đặt trong .env

    protected $fillable = [
        'name',
        'email',
        'password',
        // Nếu sau này bạn thêm 'phone' thì thêm vào đây
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}

