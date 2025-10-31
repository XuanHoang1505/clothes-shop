<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

Route::post('register', [UserController::class, 'register']);
Route::apiResource('products', ProductController::class);