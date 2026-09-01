<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->string('instagram_url')->nullable()->after('website_url');
            $table->string('shopee_url')->nullable()->after('instagram_url');
            $table->string('facebook_url')->nullable()->after('shopee_url');
            $table->string('tiktok_url')->nullable()->after('facebook_url');
        });
    }

    public function down(): void
    {
        Schema::table('businesses', function (Blueprint $table) {
            $table->dropColumn(['instagram_url', 'shopee_url', 'facebook_url', 'tiktok_url']);
        });
    }
};
