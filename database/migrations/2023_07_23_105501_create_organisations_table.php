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
        Schema::create('organisations', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->index();
            $table->string('adresse');
            $table->integer('code_postal');
            $table->string('ville');
            $table->enum('statut', ['CLIENT', 'LEAD', 'PROSPECT'])->default('CLIENT');
            $table->string('cle')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organisation');
    }
};
