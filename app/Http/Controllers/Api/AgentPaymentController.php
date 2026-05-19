<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AgentPayment;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AgentPaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = AgentPayment::query()
            ->with([
                'agent:id,name,email',
                'creator:id,name',
            ])
            ->orderByDesc('payment_date')
            ->orderByDesc('id');

        if (! $request->user()->is_admin && $request->user()->role !== 'admin') {
            $query->where('agent_user_id', $request->user()->id);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'agent_user_id' => [
                'required',
                Rule::exists('users', 'id')->where(static fn($q) => $q->where('role', 'agent')),
            ],
            'purpose' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'payment_method' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:2000',
        ]);

        $payment = AgentPayment::create([
            'reference_no' => $this->generateReferenceNo(),
            'agent_user_id' => $data['agent_user_id'],
            'created_by' => $request->user()->id,
            'purpose' => $data['purpose'],
            'amount' => $data['amount'],
            'payment_date' => $data['payment_date'],
            'payment_method' => $data['payment_method'] ?? 'cash',
            'notes' => $data['notes'] ?? null,
        ]);

        return response()->json($payment->load(['agent:id,name,email', 'creator:id,name']), 201);
    }

    public function destroy(AgentPayment $agentPayment)
    {
        $agentPayment->delete();

        return response()->json(null, 204);
    }

    private function generateReferenceNo(): string
    {
        do {
            $ref = 'AP-' . now()->format('Ymd') . '-' . str_pad((string) random_int(1, 99999), 5, '0', STR_PAD_LEFT);
        } while (AgentPayment::query()->where('reference_no', $ref)->exists());

        return $ref;
    }
}
