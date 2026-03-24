import { Request, Response } from "express";
import { CheckSystemOutputDTO } from "./dtos";

const checkSystem = async (req: Request, res: Response) => {
  try {
    const response: CheckSystemOutputDTO = {
      status: "ok",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(
      "[CONTROLLERS][CHECK HEALTH][CHECK SYSTEM][ERROR] Houve um error verificar integridade do sistema.",
    );
    return res.status(500).json({
      error:
        "Houve um error ao verificar integridade do sistema. Error: " + error,
    });
  }
};

export default checkSystem;
