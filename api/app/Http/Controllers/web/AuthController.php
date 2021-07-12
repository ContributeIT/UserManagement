<?php


namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\UserModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function getLogin()
    {
        $output = new \Symfony\Component\Console\Output\ConsoleOutput();
        $output->writeln(request());

        $username = request()->username;
        $password = request()->password;

        $get_profile = UserModel::where('username', $username)->first();
        try {
            if ($get_profile != null && Hash::check($password, $get_profile->password)) {
                $success['message'] = __('api.login_ok');
                $success['status'] = 200;
                $success['token'] = $get_profile->createToken('MyApp')->accessToken;
                $get_profile->remember_token = $success['token'];
                $get_profile->save();
                return resMes("Login Success!", 200, $success);
            } else {
                return response()->json([
                    'status' => 403,
                    'message' => "Wrong username or password!"
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 500,
                'message' => $th->getMessage()
            ]);
        }
    }
}
