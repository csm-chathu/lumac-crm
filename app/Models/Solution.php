<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'base_price',
        'demo_url',
        'demo_username',
        'demo_email',
        'demo_password',
        'gallery_images',
        'is_active',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'gallery_images' => 'array',
        'is_active' => 'boolean',
    ];

    protected $appends = ['agent_price'];

    public function features()
    {
        return $this->hasMany(SolutionFeature::class)->orderBy('sort_order')->orderBy('id');
    }

    public function getAgentPriceAttribute(): string
    {
        $defaultDiscount = (float) GlobalSetting::getValue('default_agent_discount_rate', '35');
        $discounted = $this->priceForDiscountRate($defaultDiscount);

        return number_format($discounted, 2, '.', '');
    }

    public function priceForDiscountRate(float $discountRate): float
    {
        $basePrice = (float) $this->base_price;
        $normalized = min(100.0, max(0.0, $discountRate));
        $multiplier = 1 - ($normalized / 100);
        $discounted = $basePrice * $multiplier;

        return round($discounted, 2);
    }
}
