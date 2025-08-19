<x-mail::message>
# Welcome,

Hello {{ $user->name }},

Your account has been created successfully. Below are your login details:

**Email:** {{ $user->email }}  
**Password:** {{ $password }}

<x-mail::button :url="url('/login')">
Login to Your Account
</x-mail::button>

For security, please log in and change your password immediately after your first login.

Thanks,  
{{ config('app.name') }}
</x-mail::message>