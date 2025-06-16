<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
