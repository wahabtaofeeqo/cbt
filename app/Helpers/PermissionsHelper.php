<?php

use Illuminate\Support\Facades\Auth;

if (!function_exists('can')) {
    function can()
    {
        $user = Auth::user();
        return [
            'create_course' => $user && $user->hasAnyRole(['Super-Admin', 'Teacher']),
            'edit_course' => $user && $user->hasAnyRole(['Super-Admin', 'Teacher']),
            'delete_course' => $user && $user->hasAnyRole(['Super-Admin', 'Teacher']),
            'update_score' => $user && $user->hasAnyRole(['Super-Admin', 'Teacher']),
            'create_assessment' => $user && $user->hasAnyRole(['Super-Admin', 'Teacher']),
        ];
    }
}
