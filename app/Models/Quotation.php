<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quotation extends Model
{
    use HasFactory;

    protected $fillable = [
        'quote_number',
        'user_id',
        'customer_id',
        'subtotal',
        'discount_rate',
        'final_total',
        'commission_rate',
        'commission_amount',
        'status',
        'notes',
        'warranty_months',
        'validity_days',
        'show_terms',
        'discount_amount',
        'discount_reason',
        'issued_at',
        'revoked_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount_rate' => 'decimal:2',
        'final_total' => 'decimal:2',
        'commission_rate' => 'decimal:2',
        'commission_amount' => 'decimal:2',
        'issued_at' => 'datetime',
        'revoked_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function items()
    {
        return $this->hasMany(QuotationItem::class);
    }

    public function auditLogs()
    {
        return $this->hasMany(QuotationAuditLog::class)->orderByDesc('id');
    }
}
