<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/login', 'web\AuthController@getLogin');
Route::post("/register", 'web\UserController@createProfile');

/*
|--------------------------------------------------------------------------
| Middleware (Temporary set middleware here for test)
|--------------------------------------------------------------------------
|
| Only place middleware where need to be protected ,
| just like user info (view profile , edit profile)
| or user action ( news edit , news post )
|
*/
Route::group(['middleware' => 'token'], function ($router) {
    $router->get('/user', 'web\UserController@detailProfile');
    $router->put('/user', 'web\UserController@updateProfile');
    $router->get('/users', 'web\UserController@getUser');
});
