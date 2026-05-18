<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentProfile;
use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'agent',
            'is_admin' => false,
            'is_active' => true,
        ]);

        AgentProfile::create([
            'user_id' => $user->id,
            'discount_rate' => 35,
            'commission_rate' => 10,
            'status' => 'active',
        ]);

        $this->seedDefaultCategories($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (! $user->is_active) {
            throw ValidationException::withMessages([
                'email' => ['Your account is currently inactive. Please contact the administrator.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'         => $user,
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    private function seedDefaultCategories(User $user)
    {
        $categories = [
            ['name' => 'Salary',        'type' => 'income',  'icon' => 'briefcase',     'color' => '#10b981'],
            ['name' => 'Freelance',     'type' => 'income',  'icon' => 'laptop',        'color' => '#3b82f6'],
            ['name' => 'Investment',    'type' => 'income',  'icon' => 'trending-up',   'color' => '#8b5cf6'],
            ['name' => 'Other Income',  'type' => 'income',  'icon' => 'plus-circle',   'color' => '#06b6d4'],
            ['name' => 'Food',          'type' => 'expense', 'icon' => 'utensils',      'color' => '#f59e0b'],
            ['name' => 'Transport',     'type' => 'expense', 'icon' => 'car',           'color' => '#ef4444'],
            ['name' => 'Shopping',      'type' => 'expense', 'icon' => 'shopping-bag',  'color' => '#ec4899'],
            ['name' => 'Bills',         'type' => 'expense', 'icon' => 'file-text',     'color' => '#f97316'],
            ['name' => 'Health',        'type' => 'expense', 'icon' => 'heart',         'color' => '#14b8a6'],
            ['name' => 'Entertainment', 'type' => 'expense', 'icon' => 'film',          'color' => '#6366f1'],
            ['name' => 'Education',     'type' => 'expense', 'icon' => 'book',          'color' => '#84cc16'],
            ['name' => 'Other',         'type' => 'expense', 'icon' => 'more-horizontal','color' => '#9ca3af'],
        ];

        foreach ($categories as $cat) {
            Category::create(array_merge($cat, ['user_id' => $user->id]));
        }
    }
}
