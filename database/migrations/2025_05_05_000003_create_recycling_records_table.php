<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('recycling_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('item_type');
            $table->string('item_brand')->nullable();
            $table->decimal('weight_kg', 8, 2);
            $table->integer('points_earned');
            $table->foreignId('kiosk_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('recycled_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('recycling_records');
    }
};
