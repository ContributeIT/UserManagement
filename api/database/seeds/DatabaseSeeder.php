<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $dummyData =[
            [
                "username" => "abc",
                "password" => "abcdx",
                "email" => "abc2@gmail.com",
                "birthday" => "01/1/1993"
            ],
            [
                "username" => "abcd",
                "password" => "abcdx",
                "email" => "abc2@gmail.com",
                "birthday" => "01/01/1993"
            ],
            [
                "username" => "abcde",
                "password" => "abcdx",
                "email" => "abc2@gmail.com",
                "birthday" => "15/10/1993"
            ]
        ];
        foreach ($dummyData as $data) {
            DB::connection()->table('users')->insert([
                'username' => $data['username'],
                'password' => Hash::make($data['password']),
                'email' => $data['email'],
                'birthday' => Carbon::createFromFormat('d/m/Y', $data['birthday']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
    }
}
