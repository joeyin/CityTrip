<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
  public function login(UserLoginRequest $request): JsonResponse
  {
    $request->validated();

    if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
      return response()->json([
        'errors' => ['email' => [trans('auth.failed')]],
        'messages' => trans('auth.failed'),
      ], 401);
    }

    return response()->json([
      'user' => Auth::user()
    ]);
  }

  public function register(UserRegisterRequest $request): JsonResponse
  {
    $request->validated();

    try {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
      ]);
      return response()->json($user);
    } catch (\Exception $e) {
      return response()->json([
        'messages' => $e->getMessage(),
      ], 400);
    }
  }

  public function update(UserUpdateRequest $request): JsonResponse
  {
    $request->validated();

    try {
      $dataToUpdate = [];
      if ($request->has('name')) {
        $dataToUpdate['name'] = $request->name;
      }
      if ($request->has('password')) {
        $dataToUpdate['password'] = Hash::make($request->password);
      }
      User::where('id', Auth::id())->update($dataToUpdate);
      return response()->json(null, 200);
    } catch (\Exception $e) {
      return response()->json([
        'messages' => $e->getMessage(),
      ], 400);
    }
  }

  public function logout(): JsonResponse
  {
    Auth::guard('web')->logout();

    return response()->json(null, 200);
  }
}
