<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $appends = [
        'agent_id',
    ];

    protected $fillable = [
        'user_id',
        'portal_user_id',
        'solution_id',
        'full_name',
        'email',
        'phone',
        'company',
        'status',
        'contract_value',
        'notes',
    ];

    protected $casts = [
        'contract_value' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function portalUser()
    {
        return $this->belongsTo(User::class, 'portal_user_id');
    }

    public function solution()
    {
        return $this->belongsTo(Solution::class);
    }

    public function requirements()
    {
        return $this->hasMany(CustomerRequirement::class);
    }

    public function activities()
    {
        return $this->hasMany(CustomerActivity::class)->orderByDesc('created_at')->orderByDesc('id');
    }

    public function quotations()
    {
        return $this->hasMany(Quotation::class);
    }

    public function advancePayments()
    {
        return $this->hasMany(AdvancePayment::class);
    }

    public function projects()
    {
        return $this->hasMany(ClientProject::class);
    }

    public function getAgentIdAttribute()
    {
        return $this->user_id;
    }
}
