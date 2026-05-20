<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (! $this->app->isLocal()) {
            // Prevent accidental usage of the local Vite dev server on shared hosting.
            Vite::useHotFile(storage_path('framework/vite.hot'));
        }
    }
}
