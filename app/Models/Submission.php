<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends BaseModel
{
    protected $fillable = [
        'assessment_id', 'student_id'
    ];

    /**
     * Get all of the answers for the Submission
     *
     * @return \Illuminate\DatabAnswerquent\Relations\HasMany
     */
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
