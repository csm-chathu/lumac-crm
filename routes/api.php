<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SolutionController;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\CustomerRequirementController;
use App\Http\Controllers\Api\AdminSolutionController;
use App\Http\Controllers\Api\AdminSolutionFeatureController;
use App\Http\Controllers\Api\AgentProfileController;
use App\Http\Controllers\Api\QuotationController;
use App\Http\Controllers\Api\ExpenseController;
use App\Http\Controllers\Api\AdvancePaymentController;
use App\Http\Controllers\Api\ClientPortalController;
use App\Http\Controllers\Api\AdminAgentController;
use App\Http\Controllers\Api\AdminConfigController;
use App\Http\Controllers\Api\AdminAnalyticsController;
use App\Http\Controllers\Api\AdminClientController;
use App\Http\Controllers\Api\ProjectController;

// Public auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard/summary',          [DashboardController::class, 'summary']);
    Route::get('/dashboard/monthly-overview', [DashboardController::class, 'monthlyOverview']);

    // Transactions
    Route::apiResource('transactions', TransactionController::class);

    // Categories
    Route::apiResource('categories', CategoryController::class)->except(['show']);

    // Devices API (all authenticated users)
    Route::apiResource('devices', \App\Http\Controllers\Api\DeviceController::class);

    // Customers (scoped to logged-in user in controller)
    Route::apiResource('customers', CustomerController::class)->only(['index', 'store', 'show', 'update', 'destroy']);
    Route::post('/customers/{customer}/requirements', [CustomerRequirementController::class, 'upsert']);

    // Agent portal
    Route::middleware('agent')->group(function () {
        Route::get('/agent/profile', [AgentProfileController::class, 'show']);
        Route::put('/agent/profile', [AgentProfileController::class, 'update']);
        Route::get('/agent/analytics', [AgentProfileController::class, 'analytics']);

        Route::get('/solutions', [SolutionController::class, 'index']);
        Route::get('/solutions/{solution}', [SolutionController::class, 'show']);

        Route::get('/quotations', [QuotationController::class, 'index']);
        Route::post('/quotations', [QuotationController::class, 'store']);
        Route::get('/quotations/{quotation}', [QuotationController::class, 'show']);
        Route::get('/quotations/{quotation}/print', [QuotationController::class, 'exportHtml']);
    Route::get('/quotations/{quotation}/pdf', [QuotationController::class, 'exportPdf']);

        Route::get('/advance-payments', [AdvancePaymentController::class, 'index']);

        Route::post('/advance-payments', [AdvancePaymentController::class, 'store']);

        Route::get('/expenses', [ExpenseController::class, 'index']);
        Route::post('/expenses', [ExpenseController::class, 'store']);
    });

    Route::middleware('customer')->group(function () {
        Route::get('/client/overview', [ClientPortalController::class, 'overview']);
    });

    Route::get('/advance-payments/{advancePayment}/receipt', [AdvancePaymentController::class, 'receipt']);
    Route::get('/advance-payments/{advancePayment}/pdf', [AdvancePaymentController::class, 'receiptPdf']);

    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/agents', [AdminAgentController::class, 'index']);
        Route::post('/agents', [AdminAgentController::class, 'store']);
        Route::put('/agents/{agent}', [AdminAgentController::class, 'update']);
        Route::delete('/agents/{agent}', [AdminAgentController::class, 'destroy']);

        Route::get('/solutions', [AdminSolutionController::class, 'index']);
        Route::post('/solutions', [AdminSolutionController::class, 'store']);
        Route::put('/solutions/{solution}', [AdminSolutionController::class, 'update']);
        Route::delete('/solutions/{solution}', [AdminSolutionController::class, 'destroy']);

        Route::post('/solutions/{solution}/features', [AdminSolutionFeatureController::class, 'store']);
        Route::put('/solutions/{solution}/features/{feature}', [AdminSolutionFeatureController::class, 'update']);
        Route::delete('/solutions/{solution}/features/{feature}', [AdminSolutionFeatureController::class, 'destroy']);

        Route::get('/settings', [AdminConfigController::class, 'settings']);
        Route::put('/settings', [AdminConfigController::class, 'updateSettings']);
        Route::get('/quotation-audit-log', [AdminConfigController::class, 'quotationAuditLog']);
        Route::get('/analytics', [AdminAnalyticsController::class, 'index']);

        Route::get('/clients', [AdminClientController::class, 'index']);
        Route::post('/clients/{customer}/portal-access', [AdminClientController::class, 'provisionPortalAccess']);
        Route::get('/expenses', [ExpenseController::class, 'index']);
        Route::get('/advance-payments', [AdvancePaymentController::class, 'index']);
    });
});

// Project Management (Admin Only)
Route::middleware('auth:sanctum', 'admin')->group(function () {
    Route::apiResource('projects', \App\Http\Controllers\Api\ProjectController::class);
    Route::post('projects/{project}/images', [\App\Http\Controllers\Api\ProjectController::class, 'uploadImage']);
    Route::delete('projects/{project}/images/{image}', [\App\Http\Controllers\Api\ProjectController::class, 'deleteImage']);
});
