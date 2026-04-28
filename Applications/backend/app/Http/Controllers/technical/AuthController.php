<?php

namespace App\Http\Controllers\technical;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
     // This method will authenticate user with password and email
    public function authenticate(Request $request)
    {
        // Validation for email and password
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // If failure returns NOT_FOUND with errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::find(Auth::user()->id);

            // Condition to technical role
            if ($user->role->value == 'technical') {
                $token = $user->createToken('token', ['access-technical'])->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role->value
                ], 200);
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Você não pode acessar o painel de técnico.',
                ], 401);
            }

        } else {
            // Return UNAUTHORIZED
            return response()->json([
                'status' => 401,
                'message' => 'O email/senha está incorreta',
            ], 401);
        }

    }
}
