<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'is_admin',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'phone',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_admin' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function customerActivities()
    {
        return $this->hasMany(CustomerActivity::class);
    }

    public function agentProfile()
    {
        return $this->hasOne(AgentProfile::class);
    }

    public function getPhoneAttribute(): ?string
    {
        return $this->agentProfile?->phone;
    }

    public function quotations()
    {
        return $this->hasMany(Quotation::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function advancePayments()
    {
        return $this->hasMany(AdvancePayment::class);
    }

    public function portalCustomers()
    {
        return $this->hasMany(Customer::class, 'portal_user_id');
    }

    public function agentPayments()
    {
        return $this->hasMany(AgentPayment::class, 'agent_user_id');
    }
}
