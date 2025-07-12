<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text'    => 'required|string',
            'type'    => 'required|string',
            'points'  => 'required|integer',
            'correct_answer' => 'nullable|integer',
            'status'  => 'sometimes|required|string',
            'options' => 'sometimes|required|array',
            'options.*.id' => 'nullable|uuid|exists:options,id',
            'options.*.value' => 'nullable|string',
            'assessment_id' => 'required|uuid|exists:assessments,id',
        ]);

         try {
            $model = Question::create($validated);

            // Options
            $options = $validated['options'];
            foreach ($options as $key => $value) {
                if($value['value']) {
                    $value['is_correct'] = $validated['correct_answer'] == $key;
                    $model->options()->create($value);
                }
            }

            return back()->with([
                'message' => 'Question added successfully'
            ]);
        } 
        catch (\Throwable $e) {
            info($e->getMessage());
            return back()->withErrors([
                'message' => 'Failed to create Question'
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
        // Find the question by ID
        $model = Question::find($id);
        if (!$model) {
            return back()->withErrors([
                'message' => 'Question not found'
            ]);
        }

        // Update question with validated data
        $validated = $request->validate([
            'text'    => 'required|string',
            'type'    => 'required|string',
            'points'  => 'required|integer',
            'correct_answer' => 'nullable|integer',
            'status'  => 'sometimes|required|string',
            'options' => 'sometimes|required|array',
            'options.*.id' => 'nullable|uuid|exists:options,id',
            'options.*.value' => 'nullable|string'
        ]);

        try {
            $model->update($validated);

            // Options
            $options = $validated['options'];
            foreach ($options as $key => $value) {
                $option = $model->options()->find($value['id']);
                if($option) {
                    $value['is_correct'] = $validated['correct_answer'] == $key;
                    $option->update($value);
                }
                else {
                    if($value['value']) $model->options()->create($value);
                }
            }

            return back()->with([
                'message' => 'Updated successfully'
            ]);
        } 
        catch (\Throwable $e) {
            return back()->withErrors([
                'message' => 'Failed to update Question'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
