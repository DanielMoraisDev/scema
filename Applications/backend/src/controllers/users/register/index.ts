import { Request, Response } from "express";
import User from "@/schemas/userSchema";
import { USER_ROLES_OPTIONS } from "@/types";
import bcrypt from "bcrypt";
import { createUserSchema } from "@/validators";
import { RegisterUserOutputDTO } from "./dtos";
import UserData from "@/schemas/userDataSchema";
import globalHelpers from "@/helpers";

const registerUser = async (req: Request, res: Response) => {
  try {
    // 1. Validação de Entrada com Zod
    const validation = createUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Dados validados e tipados
    const { email, password, name } = validation.data;

    // 2. Verificações de Existência (Database)
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(409).json({
        message: "Conflito de dados.",
        errors: "Este e-mail já está em uso.",
      });
    }

    // 3. Hash de Senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Criação do Usuário (Transacional seria ideal aqui)
    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      role: USER_ROLES_OPTIONS[0],
    });

    // 5. Criação de Dados Complementares
    const newDataUser = await UserData.create({
      user_id: newUser.user_id,
    });

    // 6. Objeto para criação de token
    const userForCreateToken = newUser.toJSON();
    delete (userForCreateToken as any).password;

    // 7.1 Criação de token
    const token =
      await globalHelpers.global.createAccessToken(userForCreateToken);

    if (!token) {
      return res.status(500).json({
        message: "Falha na autenticação.",
        error: "Não foi possivel gerar o token.",
      });
    }

    // 7.2 Criação de refresh de token
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

    const response: RegisterUserOutputDTO = {
      idParam: newUser.user_id,
      user: userForCreateToken,
      token: token,
      refreshToken: refreshToken,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][REGISTER][ERROR] Houve um error ao tentar registrar o usuário. Error: " +
        error,
    );
    return res.status(500).json({
      message: "Erro interno.",
      error: "Houve uma falha ao tentar registrar usuário.",
    });
  }
};

export default registerUser;
