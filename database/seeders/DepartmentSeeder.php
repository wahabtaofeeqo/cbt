<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Computer Science',
                'status' => 'active',
            ],
            [
                'name' => 'Mathematics',
                'status' => 'active',
            ],
            [
                'name' => 'Physics',
                'status' => 'inactive',
            ],
            [
                'name' => 'Biology',
                'status' => 'active',
            ],
            [
                'name' => 'Chemistry',
                'status' => 'active',
            ],
        ];

        foreach ($departments as $department) {
            \App\Models\Department::updateOrCreate([
                'name' => $department['name'],
            ], $department);
        }
    }
}
