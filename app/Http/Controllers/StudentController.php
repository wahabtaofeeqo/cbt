<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\StudentRepository;

class StudentController extends Controller
{
    protected StudentRepository $repository;

    /**
     * Inject the StudentRepository dependency.
     */
    public function __construct(StudentRepository $repository) {
        $this->repository = $repository;
    }

    /**
     * Display a listing of students.
     */
    public function index()
    {
        $departments = \App\Models\Department::all();

        // Fetch all students with their related user data
        return Inertia::render('students/index', [
            'students' => $this->repository->all([], ['user']),
            'departments' => $departments
        ]);
    }

    /**
     * Store a newly created student in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'phone' => 'required|string|unique:users',
            'department_id' => 'required|exists:departments,id',
            'status' => 'required|string',
            'level' => 'required|in:100,200,300,400',
            'matric_number' => 'required|string|unique:students'
        ]);

        try {
            // Store the new student using the repository
            $this->repository->store($validated);
            return back()->with('success', 'Student created successfully');
        } 
        catch (\Throwable $e) {
            info($e->getMessage());
            // Handle any errors during creation
            return back()->withErrors([
                'message' => 'Failed to create Student'
            ]);
        }
    }

    /**
     * Display the specified student.
     * (Not implemented)
     */
    public function show(string $id)
    {
        // Method intentionally left blank
    }

    /**
     * Update the specified student in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            // Find the student by ID
            $model = $this->repository->find($id);
            if (!$model) {
                return back()->withErrors([
                    'message' => 'Student not found'
                ]);
            }

            // Update student with validated data
            $validated = $request->validate([
                'name' => 'sometimes|required|string',
                'email' => 'sometimes|required|email|unique:users,email,' . $id,
                'phone' => 'sometimes|required|string',
                'department' => 'nullable|string',
                'status' => 'sometimes|required|string',
                'level' => 'sometimes|required|in:100,200,300,400'
            ]);
            $model->update($validated);

            return to_route('students.index');
        } catch (\Throwable $th) {
            // Handle any errors during update
            return back()->withErrors([
                'message' => 'Failed to update Student'
            ]);
        }
    }

    /**
     * Remove the specified student from storage.
     */
    public function destroy(string $id)
    {
        // Find the student by ID
        $model = $this->repository->find($id);
        if (!$model) {
            return back()->withErrors([
                'message' => 'Student not found'
            ]);
        }

        // Delete the student
        $model->delete();
        return to_route('students.index');
    }
}
