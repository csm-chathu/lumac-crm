<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAgentController extends Controller
{
    public function index()
    {
        $agents = User::query()
            ->where('role', 'agent')
            ->with('agentProfile')
            ->orderBy('name')
            ->get();

        return response()->json($agents);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'is_active' => 'nullable|boolean',
            'phone' => 'nullable|string|max:50',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            'commission_rate' => 'nullable|numeric|min:0|max:100',
            'status' => 'nullable|in:active,suspended',
        ]);
        $phone = isset($data['phone']) ? trim((string) $data['phone']) : null;

        $agent = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'agent',
            'is_admin' => false,
            'is_active' => $data['is_active'] ?? true,
        ]);

        AgentProfile::updateOrCreate(
            ['user_id' => $agent->id],
            [
            'phone' => $phone !== '' ? $phone : null,
            'discount_rate' => $data['discount_rate'] ?? 35,
            'commission_rate' => $data['commission_rate'] ?? 10,
            'status' => $data['status'] ?? 'active',
            ]
        );

        return response()->json($agent->load('agentProfile'), 201);
    }

    public function update(Request $request, User $agent)
    {
        abort_if($agent->role !== 'agent', 404);

        $data = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255|unique:users,email,' . $agent->id,
            'is_active' => 'nullable|boolean',
            'phone' => 'nullable|string|max:50',
            'discount_rate' => 'nullable|numeric|min:0|max:100',
            'commission_rate' => 'nullable|numeric|min:0|max:100',
            'status' => 'nullable|in:active,suspended',
        ]);
        $phone = array_key_exists('phone', $data) ? trim((string) $data['phone']) : null;

        $agent->update(array_filter([
            'name' => $data['name'] ?? null,
            'email' => $data['email'] ?? null,
            'is_active' => $data['is_active'] ?? null,
        ], static fn($v) => $v !== null));

        AgentProfile::updateOrCreate(
            ['user_id' => $agent->id],
            [
                'phone' => $phone !== '' ? $phone : ($agent->agentProfile?->phone ?? null),
                'discount_rate' => $data['discount_rate'] ?? $agent->agentProfile?->discount_rate ?? 35,
                'commission_rate' => $data['commission_rate'] ?? $agent->agentProfile?->commission_rate ?? 10,
                'status' => $data['status'] ?? $agent->agentProfile?->status ?? 'active',
            ]
        );

        return response()->json($agent->fresh()->load('agentProfile'));
    }

    public function destroy(User $agent)
    {
        abort_if($agent->role !== 'agent', 404);

        $agent->delete();

        return response()->json(null, 204);
    }
}
