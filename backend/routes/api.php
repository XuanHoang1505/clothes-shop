<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DiscountController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('reset-password', [AuthController::class, 'resetPassword']);
Route::post('resend-otp', [AuthController::class, 'resendOtp']);

Route::get('/categories', [ProductController::class, 'categories']);
Route::get('/brands', [ProductController::class, 'brands']);



Route::prefix('products')->group(function () {
    Route::get('', [ProductController::class, 'index']);
    Route::get('/featured', [ProductController::class, 'featured']);
    Route::get('/new', [ProductController::class, 'newProducts']);
    Route::get('/bestseller', [ProductController::class, 'bestseller']);
    Route::get('/price-range', [ProductController::class, 'getByPriceRange']);
    Route::get('/filters', [ProductController::class, 'filters']); 
    Route::get('/category/{slug}', [ProductController::class, 'getByCategory']);

    Route::get('/{id}/check-stock', [ProductController::class, 'checkStock']);
    Route::get('/{slug}', [ProductController::class, 'findBySlug']); 
    
    // ===== ADMIN ROUTES =====
    Route::middleware(['auth:api', 'admin'])->group(function () {
        Route::post('/', [ProductController::class, 'store']);
        Route::put('/{id}', [ProductController::class, 'update']);
        Route::delete('/{id}', [ProductController::class, 'destroy']);

    });
});

Route::prefix('discounts')->group(function () {
      Route::middleware(['auth:api', 'admin'])->group(function () {
        // CRUD operations
    });
});

Route::post('/discounts', [DiscountController::class, 'store']);
Route::get('/discounts/{code}', [DiscountController::class, 'findByCode']);
