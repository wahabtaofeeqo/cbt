<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends BaseModel
{
    protected $fillable = [
        'assessment_id', 'student_id', 'score', 'is_score_visible'
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

    /**
     * Get the student that owns the Submission
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }
    /**
     * Get the assessment that owns the Submission
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assessment()
    {
        return $this->belongsTo(Assessment::class);
    }
}
