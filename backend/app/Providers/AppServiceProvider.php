<?php

namespace App\Providers;

use App\Repositories\Eloquent\DiscountRepository;
use App\Repositories\Eloquent\ProductRepository;
use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Interfaces\DiscountRepositoryInterface;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Implementations\DiscountService;
use App\Services\Implementations\ProductService;
use App\Services\Implementations\UserService;
use App\Services\Interfaces\DiscountServiceInterface;
use App\Services\Interfaces\ProductServiceInterface;
use App\Services\Interfaces\UserServiceInterface;
use App\Services\OtpService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Bind Service
        $this->app->bind(
            ProductServiceInterface::class,
            ProductService::class
        );

        $this->app->bind(
            DiscountServiceInterface::class,
            DiscountService::class
        );

        $this->app->bind(
            UserServiceInterface::class,
            UserService::class
        );
        // Bind Repository
        $this->app->bind(
            ProductRepositoryInterface::class,
            ProductRepository::class
        );

        $this->app->bind(
            DiscountRepositoryInterface::class,
            DiscountRepository::class
        );


        $this->app->bind(
            UserRepositoryInterface::class, 
            UserRepository::class
        );

        $this->app->singleton(OtpService::class, function ($app) {
            return new OtpService();
        });  
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
