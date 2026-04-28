<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsManager
{
    public function handle(Request $request, Closure $next): Response
    {
        // Se o token existe mas não tem a "habilidade" necessária
        if (!$request->user() || !$request->user()->tokenCan('access-manager')) {
            return response()->json([
                'status' => 403,
                'message' => 'Você não possui permissão de gestor para acessar este recurso.'
            ], 403);
        }

        return $next($request);
    }
}
