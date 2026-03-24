import jwt from "jsonwebtoken";
import configs from "@/configs";
import { UserRoles } from "@/types";

export interface TokenInputDTO {
  user_id?: string;
  name: string;
  email: string;
  role: UserRoles;
}

const ACCESS_TOKEN_EXPIRY = "15m";

const createAccessToken = (user: TokenInputDTO): string => {
  const secretKey = configs.auths.token.secret.access as string;

  const payload: TokenInputDTO = {
    user_id: user.user_id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, secretKey, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export default createAccessToken;
