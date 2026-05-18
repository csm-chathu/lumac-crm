<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GlobalSetting;
use App\Models\QuotationAuditLog;
use Illuminate\Http\Request;

class AdminConfigController extends Controller
{
    public function settings()
    {
        return response()->json([
            'default_agent_discount_rate' => GlobalSetting::getValue('default_agent_discount_rate', '35'),
        ]);
    }

    public function updateSettings(Request $request)
    {
        $data = $request->validate([
            'default_agent_discount_rate' => 'required|numeric|min:0|max:100',
        ]);

        GlobalSetting::query()->updateOrCreate(
            ['setting_key' => 'default_agent_discount_rate'],
            ['setting_value' => (string) $data['default_agent_discount_rate']]
        );

        return response()->json(['message' => 'Settings updated successfully.']);
    }

    public function quotationAuditLog()
    {
        $logs = QuotationAuditLog::query()
            ->with(['quotation.customer', 'quotation.user', 'user'])
            ->orderByDesc('id')
            ->get();

        return response()->json($logs);
    }
}
