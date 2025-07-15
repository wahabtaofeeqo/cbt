<?php

namespace App\Exports;

use App\Models\Submission;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class SubmissionsExport implements FromQuery, WithMapping, WithHeadings
{
    protected $assessmentId;

    public function __construct($id)
    {
        $this->assessmentId = $id;
    }

    public function query()
    {
        return Submission::with([
            'student.user',
            'assessment.course'
        ])->where('assessment_id', $this->assessmentId);
    }

    public function map($submission): array
    {
        return [
            $submission->student->user->name ?? '',
            $submission->student->matric_number ?? '',
            $submission->assessment->course->code ?? '',
            $submission->assessment->course->title ?? '',
            $submission->score,
            Date::dateTimeToExcel($submission->created_at),
        ];
    }

    public function headings(): array
    {
        return [
            'Student Name',
            'Matric Number',
            'Course Code',
            'Course Title',
            'Score',
            'Submitted At',
        ];
    }
}
