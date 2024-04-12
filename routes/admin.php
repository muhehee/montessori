<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;


Route::middleware(['auth'])->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('index');
});

Route::get('/admin/login', function () {
    return Inertia::render('Admin/Login', []);
})->middleware('guest')->name('loginPage');