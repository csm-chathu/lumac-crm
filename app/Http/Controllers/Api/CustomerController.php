<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerActivity;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = $user->is_admin
            ? Customer::query()
            : $user->customers();

        $customers = $query
            ->with(['solution', 'requirements.solutionFeature', 'activities', 'portalUser', 'projects', 'advancePayments'])
            ->when($request->filled('status'), fn($q) => $q->where('status', $request->status))
            ->orderByDesc('created_at')
            ->get();

        return response()->json($customers);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'solution_id' => 'nullable|exists:solutions,id',
            'status' => 'nullable|in:lead,contacted,qualified,proposal,won,lost',
            'contract_value' => 'nullable|numeric|min:0',
            'portal_user_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string|max:1000',
        ]);

        $customer = $request->user()->customers()->create($data);

        $this->logActivity($customer, $request, 'customer_created', 'Customer registered', 'New customer profile added.');

        return response()->json($customer->load(['solution', 'activities', 'portalUser', 'projects', 'advancePayments']), 201);
    }

    public function show(Request $request, Customer $customer)
    {
        abort_if(! $request->user()->is_admin && $customer->user_id !== $request->user()->id, 403);

        return response()->json($customer->load(['solution.features', 'requirements.solutionFeature', 'activities', 'portalUser', 'projects', 'advancePayments', 'quotations.items']));
    }

    public function update(Request $request, Customer $customer)
    {
        abort_if(! $request->user()->is_admin && $customer->user_id !== $request->user()->id, 403);

        $data = $request->validate([
            'full_name' => 'sometimes|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'company' => 'nullable|string|max:255',
            'solution_id' => 'nullable|exists:solutions,id',
            'status' => 'nullable|in:lead,contacted,qualified,proposal,won,lost',
            'contract_value' => 'nullable|numeric|min:0',
            'portal_user_id' => 'nullable|exists:users,id',
            'notes' => 'nullable|string|max:1000',
        ]);

        $oldStatus = $customer->status;
        $customer->update($data);

        $description = 'Customer profile updated.';
        if (array_key_exists('status', $data) && $data['status'] !== $oldStatus) {
            $description = "Status moved from {$oldStatus} to {$data['status']}.";
        }
        $this->logActivity($customer, $request, 'customer_updated', 'Customer updated', $description, [
            'changed_fields' => array_keys($data),
        ]);

        return response()->json($customer->fresh()->load(['solution', 'requirements.solutionFeature', 'activities', 'portalUser', 'projects', 'advancePayments']));
    }

    public function destroy(Request $request, Customer $customer)
    {
        abort_if(! $request->user()->is_admin && $customer->user_id !== $request->user()->id, 403);

        $customer->delete();

        return response()->json(null, 204);
    }

    private function logActivity(Customer $customer, Request $request, string $eventType, string $title, ?string $description = null, array $meta = []): void
    {
        CustomerActivity::create([
            'customer_id' => $customer->id,
            'user_id' => $request->user()->id,
            'event_type' => $eventType,
            'title' => $title,
            'description' => $description,
            'meta' => $meta ?: null,
        ]);
    }
}
