<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin Role
        $superAdminRole = Role::firstOrCreate(['name' => 'Super-Admin']);

        // Create Super Admin User
        $superAdminUser = User::firstOrCreate([
            'email' => 'admin@cbt.com'], [
            'name' => 'Super Admin',
            'password' => Hash::make("Password123#")
        ]);

        // Assign Super Admin Role to User
        $superAdminUser->assignRole($superAdminRole);
    }
}
