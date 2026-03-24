import { Request, Response } from "express";
import User from "@/schemas/userSchema";
import { updatePasswordUserSchema } from "@/validators";
import { DataToUpdatePasswordDTO } from "./dtos";
import bcrypt from "bcrypt";

const updatePassword = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // 1. Validação de Entrada com Zod
    const validation = updatePasswordUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Dados validados e tipados
    const { currentPassword, newPassword } = validation.data;

    // 2. Verifica existência de usuário
    const user = await User.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({
        message: "Falha na autenticação.",
        error: "Usuário não encontrado.",
      });
    }

    // 3. Comparar senhas
    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!comparePassword) {
      return res.status(500).json({
        message: "Credenciais inválidas.",
        error: "Senha incorreta.",
      });
    }

    const dataToUpdate: DataToUpdatePasswordDTO = {
      password: undefined,
    };

    if (currentPassword && newPassword) {
      const salt = await bcrypt.genSalt(10);
      dataToUpdate.password = await bcrypt.hash(newPassword, salt);
    }

    // 4. Atualizar dados
    await User.update(dataToUpdate, {
      where: { user_id: user.user_id },
    });

    return res.status(200).send();
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][UPDATE PASSWORD][ERROR] Houve um error ao tentar atualizar a senha do usuário. Error: " +
        error,
    );
    return res.status(500).json({
      message: "Erro interno.",
      error: "Houve uma falha ao tentar atualizar a senha do usuário.",
    });
  }
};

export default updatePassword;
