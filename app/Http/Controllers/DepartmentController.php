<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Department;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all departments by default
        $departments = Department::all();
        return Inertia::render('departments/index', [
            'can' => can(),
            'departments' => $departments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'name' => 'required|string|unique:departments,name',
            'status' => 'required|string',
        ]);

        try {
            // Store the new department using the repository
            Department::create($validated);
            return back()->with('success', 'Department created successfully');
        }
        catch (\Throwable $e) {
            info($e->getMessage());
            // Handle any errors during creation
            return back()->withErrors([
                'message' => 'Failed to create Department'
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
