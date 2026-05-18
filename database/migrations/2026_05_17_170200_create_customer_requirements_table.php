<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('customer_requirements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->cascadeOnDelete();
            $table->foreignId('solution_feature_id')->constrained()->cascadeOnDelete();
            $table->boolean('is_requested')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['customer_id', 'solution_feature_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_requirements');
    }
};
