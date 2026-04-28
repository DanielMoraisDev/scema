<?php

use App\Http\Controllers\manager\AuthController as ManagerAuthController;
use App\Http\Controllers\manager\TechnicalController;
use App\Http\Controllers\technical\AuthController as TechnicalAuthController;
use App\Http\Controllers\technical\ManagerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



/*
|--------------------------------------------------------------------------
| Autenticação (Público)
|--------------------------------------------------------------------------
*/
Route::post('/manager/login', [ManagerAuthController::class, 'authenticate']);
Route::post('/technical/login', [TechnicalAuthController::class, 'authenticate']);

/*
|--------------------------------------------------------------------------
| Área do Gestor (Manager)
|--------------------------------------------------------------------------
*/
Route::group([
    'prefix' => 'manager',
    'middleware' => ['auth:sanctum', 'token.manager']
], function () {
    Route::get('/technicals', [TechnicalController::class, 'index']);

});

/*
|--------------------------------------------------------------------------
| Área do Técnico (Technical)
|--------------------------------------------------------------------------
*/
Route::group([
    'prefix' => 'technical',
    'middleware' => ['auth:sanctum', 'token.technical']
], function () {
    Route::get('/managers', [ManagerController::class, 'index']);

});
