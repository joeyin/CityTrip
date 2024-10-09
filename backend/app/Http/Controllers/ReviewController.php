<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewsCreateRequest;
use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
  public function index($id)
  {
    $reviews = Review::where('facility_id', $id)
      ->join('users', 'users.id', '=', 'reviews.user_id')
      ->select('reviews.*', 'users.name as user_name', 'users.email as user_email')
      ->get();

    foreach($reviews as $review) {
      $review->user = [
        'name' => $review->user_name,
        'avatar' => User::getAvatarAttribute($review->email),
      ];
      unset($review->user_name);
      unset($review->user_email);
    }

    return response()->json($reviews);
  }

  public function create(ReviewsCreateRequest $request, $id): JsonResponse
  {
    $request->validated();

    try {
      $review = Review::create([
        'facility_id' => $id,
        'user_id' => Auth::id(),
        'rank' => $request->rank,
        'comments' => $request->comments,
      ]);
      return response()->json($review);
    } catch (\Exception $e) {
      return response()->json([
        'messages' => $e->getMessage(),
      ], 400);
    }
  }
}
