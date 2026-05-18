<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerRequirement extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'solution_feature_id',
        'is_requested',
        'notes',
    ];

    protected $casts = [
        'is_requested' => 'boolean',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function solutionFeature()
    {
        return $this->belongsTo(SolutionFeature::class);
    }
}
