<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', 'IndexController@home')->name('home');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', 'IndexController@index')->name('dashboard');

    // Courses
    Route::prefix('courses')->group(function () {
        Route::get('/', 'CourseController@index')->name('courses.index');
        Route::post('/', 'CourseController@store')->name('courses.store');
        Route::put('{id}', 'CourseController@update')->name('courses.update');
        Route::delete('{id}', 'CourseController@destroy')->name('courses.delete');
    });

    // Teachers
    Route::prefix('teachers')->group(function () {
        Route::get('/', 'TeacherController@index')->name('teachers.index');
        Route::post('/', 'TeacherController@store')->name('teachers.store');
        Route::put('{id}', 'TeacherController@update')->name('teachers.update');
        Route::delete('{id}', 'TeacherController@destroy')->name('teachers.delete');
    });

    // Students
    Route::prefix('students')->group(function () {
        Route::get('/', 'StudentController@index')->name('students.index');
        Route::post('/', 'StudentController@store')->name('students.store');
        Route::put('{id}', 'StudentController@update')->name('students.update');
        Route::delete('{id}', 'StudentController@destroy')->name('students.delete');
    });

    // Assessment
    Route::prefix('assessments')->group(function () {
        Route::get('/', 'AssessmentController@index')->name('assessments.index');
        Route::get('{id}', 'AssessmentController@show')->name('assessments.show');
        Route::post('/', 'AssessmentController@store')->name('assessments.store');
        Route::put('{id}', 'AssessmentController@update')->name('assessments.update');
        Route::delete('{id}', 'AssessmentController@destroy')->name('assessments.delete');
        Route::post('{id}/submit', 'AssessmentController@submit')->name('assessments.submit');
    });

    // Department
    Route::prefix('departments')->group(function () {
        Route::get('/', 'DepartmentController@index')->name('departments.index');
        Route::get('{id}', 'DepartmentController@show')->name('departments.show');
        Route::post('/', 'DepartmentController@store')->name('departments.store');
        Route::put('{id}', 'DepartmentController@update')->name('departments.update');
        Route::delete('{id}', 'DepartmentController@destroy')->name('departments.delete');
    });

    // Questions
    Route::prefix('questions')->group(function () {
        Route::get('/', 'QuestionController@index')->name('questions.index');
        Route::get('{id}', 'QuestionController@show')->name('questions.show');
        Route::post('/', 'QuestionController@store')->name('questions.store');
        Route::put('{id}', 'QuestionController@update')->name('questions.update');
        Route::delete('{id}', 'QuestionController@destroy')->name('questions.delete');
    });

    // Tests
    Route::prefix('tests')->group(function () {
        Route::get('{id}', 'AssessmentController@start')->name('assessments.start');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
