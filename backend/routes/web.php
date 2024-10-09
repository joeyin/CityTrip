<?php

use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('/user')->group(function () {
    Route::post('/login', [UserController::class, 'login'])->name('user.login');
    Route::post('/register', [UserController::class, 'register'])->name('user.register');

    Route::middleware('auth')->group(function () {
        Route::put('/profile', [UserController::class, 'update']);
        Route::get('/logout', [UserController::class, 'logout'])->name('user.logout');
    });
});

Route::prefix('/reviews')->group(function () {
    Route::middleware('auth')->group(function () {
        Route::get('/{id}', [ReviewController::class, 'index']);
        Route::post('/{id}', [ReviewController::class, 'create']);
    });
});