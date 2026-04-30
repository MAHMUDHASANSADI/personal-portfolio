<?php

use App\Http\Controllers\Api\V1\PortfolioController;
use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Admin\ProjectController;
use App\Http\Controllers\Api\V1\Admin\ExperienceController;
use App\Http\Controllers\Api\V1\Admin\SkillController;

Route::post('/v1/login', [LoginController::class, 'login']);
Route::post('/v1/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('/portfolio', [PortfolioController::class, 'index']);
    Route::post('/contact', [\App\Http\Controllers\Api\V1\ContactController::class, 'store']);
    
    // Admin Routes
    Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
        Route::apiResource('projects', ProjectController::class);
        Route::apiResource('experiences', ExperienceController::class);
        Route::apiResource('skills', SkillController::class);
        Route::get('/messages', function() {
            return \App\Models\Message::latest()->get();
        });
        Route::delete('/messages/{message}', function(\App\Models\Message $message) {
            $message->delete();
            return response()->noContent();
        });
    });
});
