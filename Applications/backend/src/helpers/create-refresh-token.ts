import jwt from "jsonwebtoken";
import configs from "@/configs";
import { UserRoles } from "@/types";

export interface RefreshTokenInputDTO {
  email: string;
  role: UserRoles;
}

const REFRESH_TOKEN_EXPIRY = "7d";

const createRefreshToken = (user: RefreshTokenInputDTO): string => {
  const secretKey = configs.auths.token.secret.refresh as string;

  const payload: RefreshTokenInputDTO = {
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, secretKey, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

export default createRefreshToken;
