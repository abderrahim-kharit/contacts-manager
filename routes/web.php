<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;


Route::get('/', fn () => redirect('/contacts'));
Route::get('/contacts/doublon', [ContactController::class, 'doublon'])->name('contacts.doublon');
Route::resource('/contacts', ContactController::class);
