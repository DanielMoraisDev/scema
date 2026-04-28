<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Cria um Gestor

        User::factory()->create([
            'name' => 'Manager',
            'role' => 'manager',
            'email' => 'manager@example.com',
        ]);

          // Cria um Técnico

        User::factory()->create([
            'name' => 'Technical',
            'role' => 'technical',
            'email' => 'technical@example.com',
        ]);

    }
}
