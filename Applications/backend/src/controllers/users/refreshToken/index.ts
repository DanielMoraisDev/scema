import { Request, Response } from "express";
import jwt, {
  JwtPayload,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
import configs from "@/configs";
import globalHelpers from "@/helpers";
import User from "@/schemas/userSchema";

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["refreshToken"];

    if (!token) {
      return res.status(401).json({
        message: "Falha na autenticação.",
        error: "Refresh token é obrigatório.",
      });
    }

    const secretKey = configs.auths.token.secret.refresh as string;

    jwt.verify(token, secretKey, async (err: any, decoded: any) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return res.status(401).json({
            message: "Falha na autenticação.",
            error: "Sessão expirada. Faça login novamente.",
          });
        }

        if (err instanceof JsonWebTokenError) {
          return res.status(403).json({
            message: "Falha na autenticação.",
            error: "Refresh token inválido.",
          });
        }
      }

      const payload = decoded as JwtPayload;

      const user = await User.findOne({ where: { email: payload.email } });
      if (!user) {
        return res.status(404).json({
          message: "Falha na autenticação.",
          error: "Usuário não encontrado.",
        });
      }

      const newAccessToken = globalHelpers.global.createAccessToken({
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      return res.status(200).json({ token: newAccessToken });
    });
  } catch (error) {
    console.error("[CONTROLLERS][USERS][REFRESH TOKEN][ERROR] Error: " + error);
    return res.status(500).json({
      message: "Erro interno.",
      error: "Houve uma falha ao tentar renovar o token.",
    });
  }
};

export default refreshToken;
