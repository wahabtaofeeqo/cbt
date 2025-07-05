<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Option extends Model
{
    use HasUuids;

    protected $fillable = [
        'value', 'is_correct', 'question_id'
    ];

    public function question() {
        return $this->belongsTo(Question::class);
    }
}
