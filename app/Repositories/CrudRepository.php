<?php

namespace App\Repositories;
use Illuminate\Database\Eloquent\Model;

abstract class CrudRepository {

    protected Model $model;

    public function find($id) {
        return $this->model::find($id);
    }

    public function all($clause = [], $relations = []) {
        return $this->model::where($clause)->with($relations)->get();
    }
}
