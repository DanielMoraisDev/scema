import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import configs from "@/configs";

interface CustomRequest extends Request {
  user?: {
    id: number | string;
    role?: string;
  };
}

export const authenticateToken =
  (rolesAccepted: string[] = []) =>
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      // Extrai o token do cabeçalho 'Authorization: Bearer <token>'
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token == null)
        return res.status(401).json({
          message: "Falha na autenticação.",
          errors: {
            token: ["Token é obrigatório."],
          },
        });

      const secretKey = configs.auths.token.secret.access as string;

      // Valida a assinatura e integridade do JWT
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err || !decoded) {
          // Trata especificamente tokens expirados
          if (err instanceof TokenExpiredError) {
            return res.status(401).json({
              message: "Falha na autenticação.",
              errors: {
                token: ["Token expirado. Faça login novamente."],
              },
            });
          }

          // Trata tokens inválidos ou malformados
          if (err instanceof JsonWebTokenError) {
            return res.status(403).json({
              message: "Falha na autenticação.",
              errors: {
                token: ["Token inválido."],
              },
            });
          }

          return res.status(403).json({
            message: "Falha na autenticação.",
            errors: {
              token: ["Não foi possível validar o token."],
            },
          });
        }

        const payload = decoded as JwtPayload & { id: number };

        req.user = {
          id: payload.id,
          role: payload.role,
        };

        // Verifica se o cargo do usuário está na lista de permissões da rota
        if (rolesAccepted.length > 0 && !rolesAccepted.includes(payload.role)) {
          return res.status(403).json({
            message: "Falha na autenticação.",
            errors: {
              role: ["Você não possui permissão para acessar este recurso."],
            },
          });
        }

        console.log("[MIDDLEWARES][AUTHENTICATE TOKEN] Sucesso: logado");
        next(); // Autorizado: segue para o controller
      });
    } catch (error) {
      console.error("[MIDDLEWARES][AUTHENTICATE TOKEN] Error: " + error);
      return res.status(500).json({
        message: "Falha na autenticação.",
        errors: {
          token: ["Erro interno ao validar o token."],
        },
      });
    }
  };

export default authenticateToken;
