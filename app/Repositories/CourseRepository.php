<?php

namespace App\Repositories;

use App\Models\Course;

class CourseRepository extends CrudRepository {

    public function __construct() {
        $this->model = new Course();
    }
}
