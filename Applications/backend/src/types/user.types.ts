import { Optional } from "sequelize";

export const USER_ROLES_OPTIONS = ["common", "admin"] as const;

export type UserRoles = (typeof USER_ROLES_OPTIONS)[number];

export interface UserAttributes {
  user_id: string;
  email: string;
  name: string;
  password: string;
  role: UserRoles;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  "user_id" | "createdAt" | "updatedAt"
>;

export interface UserDataAttributes {
  user_data_id: string;
  user_id: string;
  cpf: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDataCreationAttributes = Optional<
  UserDataAttributes,
  "user_data_id" | "cpf" | "phone" | "createdAt" | "updatedAt"
>;
