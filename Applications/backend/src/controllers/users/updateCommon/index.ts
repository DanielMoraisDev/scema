import { Request, Response } from "express";
import User from "@/schemas/userSchema";
import { updateCommonUserSchema } from "@/validators";
import { DataToUpdateCommonDTO } from "./dtos";

const updateCommon = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    // 1. Validação de Entrada com Zod
    const validation = updateCommonUserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    // Dados validados e tipados
    const { email, name } = validation.data;

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

    // TODO: adicionar CPF e TELEFONE
    const dataToUpdate: DataToUpdateCommonDTO = {
      email: email,
      name: name,
    };

    // 3. Atualizar dados
    await User.update(dataToUpdate, {
      where: { user_id: user.user_id },
    });

    return res.status(200).send();
  } catch (error) {
    console.error(
      "[CONTROLLERS][USERS][UPDATE COMMON][ERROR] Houve um error ao tentar atualizar os dados comuns usuário. Error: " +
        error,
    );
    return res.status(500).json({
      message: "Erro interno.",
      error: "Houve uma falha ao tentar atualizar dados do usuário.",
    });
  }
};

export default updateCommon;
