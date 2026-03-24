import { UserAttributes } from "@/types";

type TokenCreate = Omit<UserAttributes, "password">;

export interface LoginUserOutputDTO {
  idParam: string | undefined;
  user: TokenCreate;
  token: string;
  refreshToken: string;
}
