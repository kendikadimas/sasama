<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('potential_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        // Seed default groups
        $desaBinaanId  = DB::table('potential_groups')->insertGetId(['name' => 'Potensi Desa Binaan',  'order' => 1, 'created_at' => now(), 'updated_at' => now()]);
        $ekonomiLokalId = DB::table('potential_groups')->insertGetId(['name' => 'Potensi Ekonomi Lokal', 'order' => 2, 'created_at' => now(), 'updated_at' => now()]);

        Schema::table('potentials', function (Blueprint $table) {
            $table->foreignId('potential_group_id')->nullable()->constrained('potential_groups')->nullOnDelete()->after('sector');
        });

        // Migrate existing group enum values
        DB::table('potentials')->where('group', 'desa_binaan')->update(['potential_group_id' => $desaBinaanId]);
        DB::table('potentials')->where('group', 'ekonomi_lokal')->update(['potential_group_id' => $ekonomiLokalId]);

        Schema::table('potentials', function (Blueprint $table) {
            $table->dropColumn('group');
        });
    }

    public function down(): void
    {
        Schema::table('potentials', function (Blueprint $table) {
            $table->enum('group', ['desa_binaan', 'ekonomi_lokal'])->default('desa_binaan')->after('sector');
            $table->dropForeign(['potential_group_id']);
            $table->dropColumn('potential_group_id');
        });
        Schema::dropIfExists('potential_groups');
    }
};
