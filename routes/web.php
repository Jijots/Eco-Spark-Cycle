<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KioskController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecyclingController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/scan', [RecyclingController::class, 'create'])->name('scan');
    Route::post('/scan', [RecyclingController::class, 'store'])->name('scan.store');

    Route::get('/map', [KioskController::class, 'index'])->name('map');

    Route::get('/reports', [ReportController::class, 'index'])->name('reports');

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::post('/profile/redeem', [ProfileController::class, 'redeem'])->name('profile.redeem');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
