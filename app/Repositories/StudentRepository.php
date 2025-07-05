<?php

namespace App\Repositories;

use Str;
use Hash;
use App\Models\User;
use App\Models\Student;
use Spatie\Permission\Models\Role;

class StudentRepository extends CrudRepository {

    public function __construct() {
        $this->model = new Student;
    }

    public function store(array $payload) {

        // Role
        $role = Role::firstOrCreate([
            'name' => 'Student'
        ]);

        // Create user and assign role
        $payload['password'] = Hash::make($payload['matric_number']);
        $user = User::create($payload);
        $user->assignRole($role);

        //
        $payload['user_id'] = $user->id;
        $model = $this->model::create($payload);

        return $model;
    }
}
