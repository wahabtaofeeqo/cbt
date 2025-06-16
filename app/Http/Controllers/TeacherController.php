<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Repositories\TeacherRepository;
use App\Repositories\CourseRepository;

class TeacherController extends Controller
{
    protected TeacherRepository $repository;
    protected CourseRepository $courseRepository;

    public function __construct(TeacherRepository $repository, CourseRepository $courseRepository) {
        $this->repository = $repository;
        $this->courseRepository =  $courseRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('teachers/index', [
            'courses' => $this->courseRepository->all(),
            'teachers' => $this->repository->all([], ['user', 'courses'])
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
            'courses' => 'required|array',
            'courses.*' => 'required|uuid',
            'qualifications' => 'nullable|string',
            'status' => 'required|in:Active,Inactive, On Leave'
        ]);

        try {
            $payload = $request->all();
            $model = $this->repository->store($payload);
            return to_route('teachers.index');
        }
        catch (\Throwable $e) {
            return back()->withErrors([
                'message' => 'Failed to create Teacher. Please try again'
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
                    'message' => 'Teacher not found'
                ]);
            }

            $model->update($request->all());
            return to_route('teachers.index');
        }
        catch (\Throwable $th) {
            return back()->withErrors([
                'message' => 'Failed to update Teacher'
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
                'message' => 'Teacher not found'
            ]);
        }

        $model->delete();
        return to_route('teachers.index');
    }
}
