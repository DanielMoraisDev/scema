import { z } from "@/lib/zod-setup";
import {
  emailSchema,
  passwordSchema,
  nameSchema,
  roleSchema,
} from "./common.validators";

/**
 * Validação para criar novo usuário
 */
export const createUserSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

/**
 * Validação para autenticar usuário
 */
export const authUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  role: roleSchema,
});

/**
 * Validação para atualizar informações básicas de usuários
 */
export const updateCommonUserSchema = z.object({
  email: emailSchema.optional(),
  name: nameSchema.optional(),
});

/**
 * Validação para atualizar senha de usuários
 */
export const updatePasswordUserSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});
