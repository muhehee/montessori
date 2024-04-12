<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\PagesController;


Route::get('/', [PagesController::class, 'index'])->name('index');

// Prihlaseni uzivatele



// Neprihlaseni uzivatele

Route::middleware('guest')->group(function () {
    Route::get('/', [PagesController::class, 'index'])->name('index');
    /*  Route::get('/admin/login', [AdminController::class, 'create'])->name('admin.create');
     Route::post('/admin/login', [AuthenticatedSessionController::class, 'store'])->name('login'); */
});


/* Route::get('/email-preview/{email}', function (Request $request, $email) {
    return view('emails.' . $email, ["data" => $request->all(), 'user' => User::find(1)]);
}); */

require __DIR__ . '/auth.php';


