<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

Route::apiResource('products', ProductController::class);
Route::post('users/register', [\App\Http\Controllers\UserController::class, 'register']);