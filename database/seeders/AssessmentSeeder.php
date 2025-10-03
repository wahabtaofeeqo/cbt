<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userId = \App\Models\User::first()->id;
        $courseId = \App\Models\Course::first()->id;

        $assessment = [
            'title' => 'Introduction to Computer Science Quiz',
            'type' => 'quiz',
            'passing_score' => 70,
            'attempts_allowed' => 3,
            'due_date' => now()->addWeek(),
            'status' => 'active',
            'user_id' => $userId,
            'course_id' => $courseId,
            'created_at' => now(),
            'updated_at' => now(),
        ];

        $assessment = \App\Models\Assessment::firstOrCreate([
            'type' => $assessment['type'],
            'title' => $assessment['title'],
            'course_id' => $assessment['course_id'],
        ], $assessment);

        $questions = [
            [
                'text' => 'Which of the following is a programming language?',
                'type' => 'multiple-choice',
                'points' => 1,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),

                'options' => [
                    [
                        'value' => 'Python',
                        'is_correct' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'value' => 'HTML',
                        'is_correct' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'value' => 'CSS',
                        'is_correct' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ],
            ],

            [
                'text' => 'True or False: The CPU is the brain of the computer.',
                'type' => 'true-false',
                'points' => 3,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),

                'options' => [
                    [
                        'value' => 'True',
                        'is_correct' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                    [
                        'value' => 'False',
                        'is_correct' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ],
                ],
            ],
        ];

        foreach ($questions as $question) {
            $options = $question['options'];
            unset($question['options']);
            $question = $assessment->questions()->updateOrCreate([
                'text' => $question['text'],
                'type' => $question['type'],
            ], $question);

            foreach ($options as $option) {
                $question->options()->updateOrCreate([
                    'value' => $option['value'],
                    'is_correct' => $option['is_correct'],
                ], $option);
            }
        }
    }
}
