import { Request, Response } from "express";
import User from "@/schemas/userSchema";
import { LoginUserOutputDTO } from "./dtos";
import globalHelpers from "@/helpers";
import bcrypt from "bcrypt";
import { authUserSchema } from "@/validators";
import { error } from "node:console";

const loginUser = async (req: Request, res: Response) => {
  try {
    // 1. Validação de Entrada com Zod
    const validation = authUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Dados validados e tipados
    const { email, password, role } = validation.data;

    // 2. Verifica existência de usuário
    const user = await User.findOne({
      where: { email: email, role: role },
    });

    if (!user) {
      return res.status(404).json({
        message: "Falha na autenticação.",
        error: "Usuário não encontrado.",
      });
    }

    // 3. Comparação de senhas
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "Credenciais inválidas.",
        error: "Senha incorreta.",
      });
    }

    // 4. Objeto para criação de token
    const userForCreateToken = user.toJSON();
    delete (userForCreateToken as any).password;

    // 4.1 Criação de token
    const token =
      await globalHelpers.global.createAccessToken(userForCreateToken);

    if (!token) {
      return res.status(500).json({
        message: "Falha na autenticação.",
        error: "Não foi possivel iniciar uma sessão.",
      });
    }

    // 4.2 Criação de refresh de token
    const refreshToken = globalHelpers.global.createRefreshToken({
      email: userForCreateToken.email,
      role: userForCreateToken.role,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const response: LoginUserOutputDTO = {
      idParam: user.user_id,
      user: userForCreateToken,
      token: token,
      refreshToken: refreshToken,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][GET][ERROR] Houve um error ao tentar capturar o usuário. Error: " +
        error,
    );
    return res.status(500).json({
      message: "Erro interno.",
      error: "Houve uma falha ao tentar logar usuário.",
    });
  }
};

export default loginUser;
