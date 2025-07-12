<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends BaseModel
{
    protected $fillable = [
        'submission_id', 'question_id', 'response'
    ];

    /**
     * Get the question te Answer
     *
     * @return \Illuminate\Questionbase\Eloquent\Relations\BelongsTo
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Get the option that owns the Answer
     *
     * @return \Illuminate\Optionbase\Eloquresponsens\BelongsTo
     */
    public function option()
    {
        return $this->belongsTo(Option::class, 'response');
    }
}
