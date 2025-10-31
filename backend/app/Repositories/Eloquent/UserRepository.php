<?php
namespace App\Repositories\Eloquent;
use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function getAll()
    {
        return User::all();
    }

    public function findById($id)
    {
        return User::find($id);
    }
    public function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
    }
    public function update($id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }
    public function delete($id)
    {
        return User::destroy($id);
    }
}
