<?php

namespace App\Models;

use App\User;
use Illuminate\Database\Eloquent\Model;

class UserModel extends User
{
    protected $connection = 'mysql';
    protected $table = 'users';

    protected $casts = [
        'birthday' => 'date'
    ];

    public static function findUser($str){
        $query = self::select('*')->from('users')->
        where('username', 'like', $str."%")->
        orWhere('email', 'like', $str."%")->
        get()->toArray();
        return $query;
    }
}
