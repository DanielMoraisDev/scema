import { NextFunction, Request, Response } from "express";

const verifyBody = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body)
    return res
      .status(500)
      .json({ error: "Não há nada sendo enviado no formulário." });

  next();
};

export default verifyBody;
