<?php

namespace App\Repositories;

use App\Models\Assessment;

class AssessmentRepository extends CrudRepository {

    public function __construct() {
        $this->model = new Assessment;
    }

    public function store(array $payload) {
        $questions = $payload['questions'] ?? [];
        unset($payload['questions']);

        $model = $this->model::create($payload);

        foreach ($questions as $question) {
            $options = $question['options'] ?? [];
            $correctIndex = $question['correct_answer'] ?? null;
            unset($question['options'], $question['correct_answer']);

            $questionModel = $model->questions()->create($question);

            foreach ($options as $index => $option) {
                if (!empty($option)) {
                    $questionModel->options()->create([
                        'value' => $option,
                        'is_correct' => ($correctIndex === $index),
                    ]);
                }
            }
        }

        return $model;
    }
}