<?php

namespace App\Http\Controllers\technical;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ManagerController extends Controller
{
    // Retorna todos os técnicos
    public function index()
    {
        $managers = User::where('role', 'manager')->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data' => $managers,
        ]);

    }
}
