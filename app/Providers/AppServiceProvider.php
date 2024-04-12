<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    public const HOME = '/admin';
    
    /* public const ADMIN_HOME = '/admin'; */
    /**
     * Register any application services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::prefix('admin')
                ->middleware('web')
                // ->namespace($this->namespace)
                ->group(base_path('routes/admin.php'));
    }
}
