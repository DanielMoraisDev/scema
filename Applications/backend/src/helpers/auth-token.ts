import jwt from "jsonwebtoken";
import configs from "@/configs";
import { TokenInputDTO } from "./create-access-token";

const authToken = (tokenReceived: string): TokenInputDTO => {
  if (!tokenReceived) throw new Error("Token ausente");

  const token = tokenReceived.startsWith("Bearer ")
    ? tokenReceived.split(" ")[1]
    : tokenReceived;

  const secretKey = configs.auths.token.secret.access as string;

  try {
    const decoded = jwt.verify(token, secretKey) as TokenInputDTO;
    return decoded;
  } catch (error) {
    throw new Error("Token inválido ou expirado: " + error);
  }
};

export default authToken;
