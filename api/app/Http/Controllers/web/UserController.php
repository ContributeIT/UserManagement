<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\UserModel;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function createProfile()
    {
        $listRequest = request()->all();
        $validator = Validator::make(
            $listRequest,
            [
                '*.username' => 'required|unique:users,username',
                '*.password' => 'required',
                '*.email' => 'required|email|unique:users,email',
                '*.birthday' => 'required',
            ]
        );
        if ($validator->fails()) {
            return resMes($validator->errors(), 400);
        };
        foreach ($listRequest as $req) {
            $user = new UserModel();
            $user->username = $req['username'];
            $user->password = Hash::make($req['password']);
            $user->email = $req['email'];
            $user->birthday = Carbon::createFromFormat('d/m/Y', $req['birthday']);
            $user->save();
        }
        return resMes('Registered successful!');
    }

    public function detailProfile()
    {
        $id = request('id');
        $profile = UserModel::find($id);
        return response()->json([
            'status' => 200,
            'data' => $profile
        ]);
    }

    public function getUser()
    {
        $searchStr = request('search');
        if ($searchStr) {
            $findUser = UserModel::findUser($searchStr);
            return resMes("", 200, $findUser);
        }
        return resMes("", 200, UserModel::all());
    }

    public function updateProfile()
    {
        try{
            $id = request('id');
            $birthday = request('birthday');
            $email = request('email');

            $user = UserModel::find($id);
            $user->birthday = $birthday;
            // $user->email = $email;
            $user->save();
            return resMes("Update Success!", 200, $user);
        }catch(\Exception $e){
            return resMes($e->getMessage(), 500);
        }

    }
}
