<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Assessment;

class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(auth()->user()->hasRole('Student')) {
            $student = auth()->user()->student;

            // Fetch assessments for the student's department and level
            // Only only student hasn't taken the assessment yet (Submission Model)
            $assessments = Assessment::where('status', 'active')
                ->with('course')
                ->whereHas('course', function($query) use ($student) {
                    $query->where('department_id', $student->department_id)
                        ->where('level', $student->level);
                })->whereDate('due_date', '>=', now())
                ->whereDoesntHave('submissions', function($query) use ($student) {
                    $query->where('student_id', $student->id);
                })->get();

            return Inertia::render('students/dashboard', [
                'assessments' => $assessments,
            ]);
        }

        return Inertia::render('dashboard', [
            'roles' => auth()->user()->getRoleNames()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function home(Request $request)
    {
        $departments = \App\Models\Department::all();
        return Inertia::render('welcome', [
            'departments' => $departments,
        ]);
    }
}
