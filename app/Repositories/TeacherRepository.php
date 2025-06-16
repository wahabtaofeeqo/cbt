<?php

namespace App\Repositories;

use Str;
use Hash;
use App\Models\User;
use App\Models\Teacher;
use Spatie\Permission\Models\Role;

class TeacherRepository extends CrudRepository {

    public function __construct() {
        $this->model = new Teacher;
    }

    public function store(array $payload) {

        // Role
        $role = Role::firstOrCreate([
            'name' => 'Teacher'
        ]);

        // Create user and assign role
        $password = Str::random(6);
        $payload['password'] = Hash::make($password);
        $user = User::create($payload);
        $user->assignRole($role);

        //
        $payload['user_id'] = $user->id;
        $model = $this->model::create($payload);

        $model->courses()->attach($payload['courses']);

        return $model;
    }
}
