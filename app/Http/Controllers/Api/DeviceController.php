<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Device;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DeviceController extends Controller
{
    public function index()
    {
        return Device::all();
    }


    public function store(Request $request)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'nullable|string|max:255',
            'purchase_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
        ]);
        $device = Device::create($validated);
        return response()->json($device, 201);
    }


    public function update(Request $request, Device $device)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'nullable|string|max:255',
            'purchase_price' => 'required|numeric',
            'selling_price' => 'required|numeric',
        ]);
        $device->update($validated);
        return response()->json($device);
    }


    public function destroy(Request $request, Device $device)
    {
        if (!$request->user() || $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }
        $device->delete();
        return response()->json(null, 204);
    }
}
