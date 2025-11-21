<?php

namespace App\Http\Requests\User;

use App\Http\Requests\BaseRequest;

class UpdateUserRequest extends BaseRequest
{
    public function rules(): array
    {
        return [
            'fullName'      => 'sometimes|nullable|string|max:255',
            'email'         => 'sometimes|nullable|email|max:255|unique:users,email,' . ($this->user->id ?? null),
            'gender'        => 'sometimes|nullable|in:0,1',
            'phoneNumber'   => 'sometimes|nullable|string|max:15',
            'status'        => 'sometimes|nullable|in:ACTIVE,DISABLE',
            'role'          => 'sometimes|nullable|in:ADMIN,USER',
            'avatar'        => 'sometimes|nullable|file|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'email.unique' => 'The email has already been taken.',
        ];
    }
}
