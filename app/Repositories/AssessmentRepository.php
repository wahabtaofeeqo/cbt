<?php

namespace App\Repositories;

use App\Models\Assessment;

class AssessmentRepository extends CrudRepository {

    public function __construct() {
        $this->model = new Assessment;
    }

    public function store(array $payload) {
        $questions = $payload['questions'];
        $model = $this->model::create($payload);

        foreach($questions as $question) {

            // Create Question 
            $questionModel = $model->questions()->create($question);

            // Create and attach Question options
            if(isset($question['options'])) {
                foreach($question['options'] as $index => $option) {
                    if($option) { // It could be empty 
                        $data['value'] = $option;
                        if($question['correct_answer'] == $index) {
                            $data['is_correct'] = true;
                        }

                        $questionModel->options()->create($data);
                    }
                }
            }
        }

        //
        return $model;
    }
}