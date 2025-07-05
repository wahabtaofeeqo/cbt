<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Repositories\CourseRepository;

class CourseController extends Controller
{
    /**
     * The course repository instance.
     *
     * @var CourseRepository
     */
    protected CourseRepository $repository;

    /**
     * Inject the repository dependency.
     */
    public function __construct(CourseRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the courses.
     */
    public function index()
    {
        // Get all courses by default
        $courses = Course::all();
        $departments = \App\Models\Department::all();

        // If user is a teacher, show only their courses
        if (auth()->user()->hasRole('Teacher')) {
            $courses = auth()->user()->teacher->courses;
        }

        // Render the courses index view with permissions and courses
        return Inertia::render('courses/index', [
            'can' => can(),
            'courses' => $courses,
            'departments' => $departments,
        ]);
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        // Validate request data
        $validated = $request->validate([
            'title' => 'required|string',
            'code' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
            'level' => 'required|string',
            'department_id' => 'required|exists:departments,id',
        ]);

        try {
            // Create the course using validated data
            Course::create($validated);
            return redirect()->route('courses.index');
        } catch (\Throwable $e) {
            // Handle creation failure
            return back()->withErrors([
                'message' => 'Failed to create Course'
            ]);
        }
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the course by ID
        $model = $this->repository->find($id);
        if (!$model) {
            return back()->withErrors([
                'message' => 'Course not found'
            ]);
        }

        // Validate request data
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'code' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|string',
        ]);

        // Update the course
        $model->update($validated);
        return to_route('courses.index');
    }

    /**
     * Remove the specified course from storage.
     */
    public function destroy($id)
    {
        // Find the course by ID
        $model = $this->repository->find($id);
        if (!$model) {
            return back()->withErrors([
                'message' => 'Course not found'
            ]);
        }

        // Delete the course
        $model->delete();
        return to_route('courses.index');
    }
}
