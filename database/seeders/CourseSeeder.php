<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departmentId = \App\Models\Department::first()->id;
        $courses = [
            [
                'title' => 'Introduction to Computer Science',
                'code' => 'CSC101',
                'level' => '100',
                'description' => 'Fundamental principles of computer science including algorithms, hardware, and software concepts.',
                'department_id' => $departmentId,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Data Structures and Algorithms',
                'code' => 'CSC201',
                'level' => '100',
                'description' => 'Covers common data structures, algorithms, and their applications in solving computational problems.',
                'department_id' => $departmentId,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Database Systems',
                'code' => 'CSC301',
                'level' => '100',
                'description' => 'Introduction to relational databases, SQL, normalization, and database design principles.',
                'department_id' => $departmentId,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Operating Systems',
                'code' => 'CSC302',
                'level' => '200',
                'description' => 'Concepts of operating systems including process management, memory management, and file systems.',
                'department_id' => $departmentId,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Artificial Intelligence',
                'code' => 'CSC401',
                'level' => '200',
                'description' => 'Introduction to AI concepts including machine learning, expert systems, and natural language processing.',
                'department_id' => $departmentId,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($courses as $course) {
            \App\Models\Course::updateOrCreate([
                'code' => $course['code'],
                'level' => $course['level'],
                'department_id' => $departmentId,
            ], $course);
        }
    }
}
