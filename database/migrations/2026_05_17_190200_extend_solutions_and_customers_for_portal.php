<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('solutions', function (Blueprint $table) {
            $table->string('demo_url')->nullable()->after('base_price');
            $table->string('demo_username')->nullable()->after('demo_url');
        });

        Schema::table('customers', function (Blueprint $table) {
            $table->foreignId('portal_user_id')->nullable()->after('user_id')->constrained('users')->nullOnDelete();
            $table->decimal('contract_value', 12, 2)->default(0)->after('status');

            $table->index(['portal_user_id']);
        });
    }

    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropIndex(['portal_user_id']);
            $table->dropConstrainedForeignId('portal_user_id');
            $table->dropColumn('contract_value');
        });

        Schema::table('solutions', function (Blueprint $table) {
            $table->dropColumn(['demo_url', 'demo_username']);
        });
    }
};
