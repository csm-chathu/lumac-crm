<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quotations', function (Blueprint $table) {
            $table->decimal('discount_amount', 12, 2)->default(0)->after('validity_days');
            $table->string('discount_reason')->nullable()->after('discount_amount');
        });
    }

    public function down(): void
    {
        Schema::table('quotations', function (Blueprint $table) {
            $table->dropColumn(['discount_amount', 'discount_reason']);
        });
    }
};
