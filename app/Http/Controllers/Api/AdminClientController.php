<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AdminClientController extends Controller
{
    public function index(Request $request)
    {
        $customers = Customer::query()
            ->with(['user', 'portalUser', 'solution', 'projects', 'advancePayments'])
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->query('status')))
            ->orderByDesc('created_at')
            ->get();

        return response()->json($customers);
    }

    public function provisionPortalAccess(Customer $customer)
    {
        if ($customer->portal_user_id) {
            return response()->json([
                'message' => 'Portal access already provisioned.',
                'customer_id' => $customer->id,
                'email' => $customer->portalUser?->email,
                'temporary_password' => null,
            ]);
        }

        $email = $customer->email ?: 'client' . $customer->id . '@lumac.local';
        if (User::query()->where('email', $email)->exists()) {
            $email = 'client' . $customer->id . '.portal@lumac.local';
        }

        $temporaryPassword = Str::random(10) . 'A1!';

        $user = User::create([
            'name' => $customer->full_name,
            'email' => $email,
            'password' => Hash::make($temporaryPassword),
            'role' => 'customer',
            'is_admin' => false,
            'is_active' => true,
        ]);

        $customer->update(['portal_user_id' => $user->id]);

        return response()->json([
            'message' => 'Portal credentials generated successfully.',
            'customer_id' => $customer->id,
            'email' => $user->email,
            'temporary_password' => $temporaryPassword,
        ]);
    }
}
