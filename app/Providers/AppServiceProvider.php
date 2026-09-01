<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use League\MimeTypeDetection\ExtensionMimeTypeDetector;
use League\MimeTypeDetection\MimeTypeDetector;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // ext-fileinfo unavailable on host; use extension-based detection instead
        $this->app->bind(MimeTypeDetector::class, ExtensionMimeTypeDetector::class);
    }

    public function boot(): void
    {
        //
    }
}
