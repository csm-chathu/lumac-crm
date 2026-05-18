<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SolutionFeature extends Model
{
    use HasFactory;

    protected $fillable = [
        'solution_id',
        'feature_key',
        'label',
        'description',
        'sort_order',
    ];

    public function solution()
    {
        return $this->belongsTo(Solution::class);
    }

    public function customerRequirements()
    {
        return $this->hasMany(CustomerRequirement::class);
    }
}
