<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CloudinaryController extends Controller
{
    public function getSignature(Request $request)
    {
        $timestamp = now()->unix();
        $folder = env('CLOUDINARY_FOLDER', 'jewellery');
        $cloudName = env('CLOUDINARY_CLOUD_NAME');
        $apiKey = env('CLOUDINARY_API_KEY');
        $apiSecret = env('CLOUDINARY_API_SECRET');

        // Build the string to sign
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
