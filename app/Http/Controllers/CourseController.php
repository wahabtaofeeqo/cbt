<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Repositories\CourseRepository;

class CourseController extends Controller
{
    /**
     * var
     */
    protected CourseRepository $repository;

    public function __construct(CourseRepository $repository) {
        $this->repository = $repository;
    }

    public function index() {
        return Inertia::render('courses/index', [
            'courses' => Course::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'code' => 'required|string',
            'description' => 'required|string',
            'status' => 'required|string',
        ]);

        try {
            // Create the course
            Course::create($request->all());
            return redirect()->route('courses.index');
        }
        catch (\Throwable $e) {
            return back()->withErrors([
                'message' => 'Failed to create Course'
            ]);
        }
    }

    public function update(Request $request, $id) {
        $model = $this->repository->find($id);
        if(!$model) {
            return back()->withErrors([
                'message' => 'Course not found'
            ]);
        }

        $model->update($request->all());
        return to_route('courses.index');
    }

    public function destroy($id) {
        $model = $this->repository->find($id);
        if(!$model) {
            return back()->withErrors([
                'message' => 'Course not found'
            ]);
        }

        $model->delete();
        return to_route('courses.index');
    }
}
