<?php

use App\Http\Controllers\TasksController;
use App\Models\Users;
use App\Http\Controllers\StatesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::get('/token', function(){
    $user = Users::find(1);
    $token = $user->createToken('user-token')->plainTextToken;
    return ['token' => $token];
});

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/states', [StatesController::class, 'getAll']);
    Route::post('/tasks', [TasksController::class, 'getAll']);
    Route::get('/tasks/{id}', [TasksController::class, 'getById']);
    Route::post('/tasks/create', [TasksController::class, 'store']);
    Route::delete('/tasks/{id}', [TasksController::class, 'destroy']);
    Route::put('/tasks/like/{id}', [TasksController::class, 'setLike']);
});

