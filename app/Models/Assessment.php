<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Assessment extends Model
{
    use HasUuids;

    protected $fillable = [
        'title', 'status', 'type', 'due_date',
        'attempts_allowed', 'passing_score', 'course_id', 'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function course() {
        return $this->belongsTo(Course::class);
    }
    
    public function questions() {
        return $this->hasMany(Question::class);
    }

    public function submissions() {
        return $this->hasMany(Submission::class);
    }
}
