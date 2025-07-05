<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Question extends Model
{
    use HasUuids;

    protected $fillable = [
        'text', 'type', 'points', 'assessment_id'
    ];

    public function assessment() {
        return $this->belongsTo(Assessment::class);
    }

    public function options() {
        return $this->hasMany(Option::class);
    }
}
