<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTokenIsTechnical
{
    public function handle(Request $request, Closure $next): Response
    {
        // Se o token existe mas não tem a "habilidade" necessária
        if (!$request->user() || !$request->user()->tokenCan('access-technical')) {
            return response()->json([
                'status' => 403,
                'message' => 'Você não possui permissão de técnico para acessar este recurso.'
            ], 403);
        }

        return $next($request);
    }
}
