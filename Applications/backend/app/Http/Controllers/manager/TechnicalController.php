<?php

namespace App\Http\Controllers\manager;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class TechnicalController extends Controller
{
    // Retorna todos os técnicos
    public function index()
    {
        $technicals = User::where('role', 'technical')->orderBy('created_at', 'DESC')->get();

        return response()->json([
            'status' => 200,
            'data' => $technicals,
        ]);

    }
}
