<?php

namespace App\Providers;

use App\Repositories\Eloquent\UserRepository;
use App\Repositories\Interfaces\UserRepositoryInterface;
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
            \App\Services\Interfaces\ProductServiceInterface::class,
            \App\Services\Implementations\ProductService::class
        );

        $this->app->bind(
            \App\Services\Interfaces\UserServiceInterface::class,
            \App\Services\Implementations\UserService::class
        );
        // Bind Repository
        $this->app->bind(
            \App\Repositories\Interfaces\ProductRepositoryInterface::class,
            \App\Repositories\Eloquent\ProductRepository::class
        );

        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
