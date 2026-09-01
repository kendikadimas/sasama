<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Potential;
use App\Models\Business;
use App\Models\Program;
use App\Models\Documentation;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::firstOrCreate(
            ['email' => 'admin@bojongjengkol.desa.id'],
            [
                'name' => 'Administrator',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]
        );

        // Sample potentials
        $potentials = [
            ['name' => 'Wisata Alam Curug Indah', 'sector' => 'pariwisata', 'description' => 'Air terjun alami dengan pemandangan pegunungan yang asri.'],
            ['name' => 'Kerajinan Anyaman Bambu', 'sector' => 'umkm', 'description' => 'Produk kerajinan tangan berkualitas ekspor buatan warga lokal.'],
            ['name' => 'Kopi Robusta Bojongjengkol', 'sector' => 'pertanian', 'description' => 'Kopi asli yang ditanam di dataran tinggi desa dengan cita rasa khas.'],
        ];

        foreach ($potentials as $p) {
            Potential::firstOrCreate(['name' => $p['name']], $p);
        }
    }
}
