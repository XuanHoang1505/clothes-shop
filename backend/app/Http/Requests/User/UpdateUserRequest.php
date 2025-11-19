<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class UpdateUserRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'fullName' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . ($this->user->id ?? null),
            'gender' => 'nullable|in:0,1',
            'phoneNumber' => 'nullable|string|max:15',
            'status' => 'nullable|in:ACTIVE,DISABLE',
            'role' => 'nullable|in:ADMIN,USER',
            'avatar' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'The email has already been taken.',
        ];
    }
}
