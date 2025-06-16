<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\StudentRepository;
use App\Repositories\CourseRepository;

class StudentController extends Controller
{
    protected StudentRepository $repository;

    public function __construct(StudentRepository $repository) {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('students/index', [
            'students' => $this->repository->all([], ['user'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'phone' => 'required|string',
            'department' => 'nullable|string',
            'status' => 'required|string',
            'level' => 'required|in:100,200,300,400'
        ]);

        try {
            $payload = $request->all();
            $model = $this->repository->store($payload);
            return to_route('students.index');
        }
        catch (\Throwable $e) {
            return back()->withErrors([
                'message' => 'Failed to create Student'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $model = $this->repository->find($id);
            if(!$model) {
                return back()->withErrors([
                    'message' => 'Student not found'
                ]);
            }

            $model->update($request->all());
            return to_route('students.index');
        }
        catch (\Throwable $th) {
            return back()->withErrors([
                'message' => 'Failed to update Student'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $model = $this->repository->find($id);
        if(!$model) {
            return back()->withErrors([
                'message' => 'Student not found'
            ]);
        }

        $model->delete();
        return to_route('students.index');
    }
}
