<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PublicController;

// Public routes
Route::get('/', [PublicController::class, 'home'])->name('home');
Route::get('/potensi', [PublicController::class, 'potensi'])->name('potensi');
Route::get('/mitra', [PublicController::class, 'mitra'])->name('mitra');

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'stats' => [
                'potentials' => \App\Models\Potential::count(),
                'businesses' => \App\Models\Business::count(),
                'programs' => \App\Models\Program::count(),
                'documentations' => \App\Models\Documentation::count(),
            ],
        ]);
    })->name('dashboard');

    Route::prefix('dashboard')->group(function () {
        Route::resource('potentials', \App\Http\Controllers\Admin\PotentialController::class);
        Route::resource('potential-groups', \App\Http\Controllers\Admin\PotentialGroupController::class);
        Route::resource('businesses', \App\Http\Controllers\Admin\BusinessController::class);
        Route::resource('programs', \App\Http\Controllers\Admin\ProgramController::class);
        Route::resource('documentations', \App\Http\Controllers\Admin\DocumentationController::class);
        Route::resource('store-products', \App\Http\Controllers\Admin\StoreProductController::class);
    });
});

require __DIR__ . '/settings.php';
