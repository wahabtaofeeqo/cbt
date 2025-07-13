<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Assessment;
use Illuminate\Http\Request;
use App\Repositories\AssessmentRepository;

class AssessmentController extends Controller
{
    protected AssessmentRepository $repository;

    /**
     * Inject AssessmentRepository dependency.
     */
    public function __construct(AssessmentRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the assessments.
     * Shows all for admins, or only teacher's own for teachers.
     */
    public function index()
    {
        $user = auth()->user();

        // Default: all courses and assessments
        $courses = Course::all();
        $assessments = $this->repository->all([], [
            'questions', 'questions.options', 'course'
        ]);

        // If user is a teacher, show only their courses and assessments
        if ($user->hasRole('Teacher')) {
            $courses = $user->teacher->courses;
            $assessments = $this->repository->all(
                ['user_id' => $user->id],
                ['questions', 'questions.options', 'course']
            );
        }

        return Inertia::render('assessment/index', [
            'can' => can(),
            'courses' => $courses,
            'assessments' => $assessments
        ]);
    }

    /**
     * Store a newly created assessment in storage.
     */
    public function store(Request $request)
    {
        // Validate request data
        $request->validate([
            'title'               => 'required|string',
            'course_id'           => 'required|uuid|exists:courses,id',
            'type'                => 'required|string|in:quiz,exam,assignment',
            'passing_score'       => 'required|integer',
            'attempts_allowed'    => 'required|integer',
            'due_date'            => 'required|date',
            'questions'           => 'required|array',
            'questions.*.text'    => 'required|string',
            'questions.*.type'    => 'required|string',
            'questions.*.points'  => 'required|integer',
            'questions.*.options' => 'nullable|array'
        ]);

        try {
            $payload = $request->all();
            $payload['user_id'] = auth()->id();

            $this->repository->store($payload);

            return redirect()->route('assessments.index');
        } catch (\Throwable $e) {
            info($e->getMessage());
            return back()->withErrors([
                'message' => 'Failed to create Assessment'
            ]);
        }
    }

    /**
     * Store a newly created assessment in storage.
     */
    public function submit(Request $request, $id)
    {
        $request->validate([
            'answers' => 'required|array',
            'answers.*.answer' => 'nullable',
            'answers.*.questionId' => 'required|exists:questions,id'
        ]);

        try {
            $assessment = $this->repository->find($id);
            if (!$assessment) {
                return back()->withErrors(['message' => 'Assessment not found']);
            }

            $studentId = auth()->user()->student->id;
            $submission = \App\Models\Submission::create([
                'assessment_id' => $id,
                'student_id' => $studentId
            ]);

            $questionIds = collect($request->input('answers'))->pluck('questionId');
            $questions = \App\Models\Question::with('options')
                ->whereIn('id', $questionIds)
                ->get()
                ->keyBy('id');

            $score = 0;
            $answersData = [];

            foreach ($request->input('answers') as $answer) {
                $question = $questions->get($answer['questionId']);
                $selectedOptionId = $answer['answer'] ?? null;

                if ($question && $selectedOptionId) {
                    $option = $question->options->firstWhere('id', $selectedOptionId);
                    if ($option && $option->is_correct) {
                        $score += $question->points;
                    }
                }

                $answersData[] = [
                    'response' => $selectedOptionId,
                    'question_id' => $answer['questionId']
                ];
            }

            $submission->answers()->createMany($answersData);
            $submission->score = $score;
            $submission->save();

            return back()->with(['message' => 'Submitted successfully']);
        } catch (\Throwable $e) {
            info($e->getMessage());
            return back()->withErrors(['message' => 'Failed to submit Assessment']);
        }
    }

    /**
     * Display the specified assessment.
     */
    public function show(string $id)
    {
        $assessment = Assessment::with(['questions', 'questions.options', 'course'])->findOrFail($id);
        return Inertia::render('assessment/details', [
            'can' => can(),
            'assessment' => $assessment,
            'submissions' => \App\Models\Submission::with([
                'assessment.course', 'student.user'])->where('assessment_id', $id)->get()
        ]);
    }

    public function updateSubmissionScore(Request $request, $id) {
        $request->validate([
            'score' => 'required|integer|min:0'
        ]);

        $model = \App\Models\Submission::find($id);
        if (!$model) {
            return back()->withErrors([
                'message' => 'Submission not found'
            ]);
        }

        $model->fill($request->all());
        $model->is_score_visible = true;
        $model->save();

        //
        return redirect()->back()->with(['message' => 'Score Updated']);
    }

    public function loadSubmission($id, $submissionId) {

        $model = $this->repository->find($id);
        if (!$model) {
            return back()->withErrors([
                'message' => 'Assessment not found'
            ]);
        }

        $model->load('course');
        $submission = \App\Models\Submission::with([
            'assessment.course', 'student.user', 'answers.question.options'])->find($submissionId);
        
        //
        return Inertia::render('assessment/submission', [
            'can' => can(),
            'assessment' => $model,
            'submission' => $submission,
            'roles' => auth()->user()->getRoleNames()
        ]);
    }

    /**
     * Update the specified assessment in storage.
     * (Not implemented)
     */
    public function update(Request $request, string $id)
    {
        // To be implemented
    }

    /**
     * Remove the specified assessment from storage.
     */
    public function destroy(string $id)
    {
        $model = $this->repository->find($id);
        if (!$model) {
            return back()->withErrors([
                'message' => 'Assessment not found'
            ]);
        }

        $model->delete();

        return to_route('assessments.index');
    }

    /**
     * Start the specified assessment
     */
    public function start($id) {
        $assessment = Assessment::with([
            'questions', 
            'questions.options', 'course'])->findOrFail($id);
        if (!$assessment) {
            return back()->withErrors([
                'message' => 'Assessment not found'
            ]);
        }

        return Inertia::render('assessment/start', [
            'can' => can(),
            'assessment' => $assessment,
        ]);
    }
}
