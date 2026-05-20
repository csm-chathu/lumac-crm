<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class CloudinaryController extends Controller
{
    public function getSignature(Request $request): JsonResponse
    {
        $timestamp = now()->unix();
        $folder = config('services.cloudinary.folder', 'jewellery');
        $cloudName = config('services.cloudinary.cloud_name');
        $apiKey = config('services.cloudinary.api_key');
        $apiSecret = config('services.cloudinary.api_secret');

        if (! $cloudName || ! $apiKey || ! $apiSecret) {
            return response()->json([
                'message' => 'Cloudinary is not configured.',
            ], 500);
        }

        $stringToSign = "folder={$folder}&timestamp={$timestamp}" . $apiSecret;
        $signature = hash('sha1', $stringToSign);

        return response()->json([
            'signature' => $signature,
            'timestamp' => $timestamp,
            'api_key' => $apiKey,
            'cloud_name' => $cloudName,
            'folder' => $folder,
        ]);
    }
}
