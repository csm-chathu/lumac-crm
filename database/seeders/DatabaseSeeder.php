<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\AgentProfile;
use App\Models\GlobalSetting;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $adminUser = \App\Models\User::query()->updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'is_admin' => true,
                'is_active' => true,
            ]
        );

        $agentUser = \App\Models\User::query()->updateOrCreate(
            ['email' => 'agent@example.com'],
            [
                'name' => 'Agent User',
                'password' => bcrypt('password'),
                'role' => 'agent',
                'is_admin' => false,
                'is_active' => true,
            ]
        );

        AgentProfile::query()->updateOrCreate(
            ['user_id' => $adminUser->id],
            [
                'discount_rate' => 35,
                'commission_rate' => 10,
                'status' => 'active',
            ]
        );
        AgentProfile::query()->updateOrCreate(
            ['user_id' => $agentUser->id],
            [
                'discount_rate' => 0,
                'commission_rate' => 30,
                'status' => 'active',
            ]
        );

        GlobalSetting::query()->updateOrCreate(
            ['setting_key' => 'default_agent_discount_rate'],
            ['setting_value' => '35']
        );

        $this->call([
            SolutionSeeder::class,
        ]);
    }
}
