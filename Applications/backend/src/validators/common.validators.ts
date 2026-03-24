/**
 * Validadores Comuns/Reutilizáveis
 * Compartilhados entre múltiplos recursos
 */
import { USER_ROLES_OPTIONS } from "@/types";
import { z } from "@/lib/zod-setup";

// ===== CAMPOS COMUNS =====

/**
 * UUID v4
 */
export const uuidSchema = z.string().uuid("ID deve ser um UUID válido");

/**
 * Email com validação de formato
 */
export const emailSchema = z
  .string({
    required_error: "O e-mail é obrigatório",
    invalid_type_error: "O e-mail deve ser uma string",
  })
  .email("Email deve ser um endereço de email válido")
  .toLowerCase()
  .trim();

/**
 * Senha com requisitos de segurança
 * Mínimo 8 caracteres, 1 letra maiúscula, 1 número
 */
export const passwordSchema = z
  .string({
    required_error: "A senha é obrigatória",
  })
  .min(8, "Senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "Senha deve conter pelo menos um número");

/**
 * Senha segura (versão menos rigorosa para updates)
 */
export const weakPasswordSchema = z
  .string({
    required_error: "A senha é obrigatória",
  })
  .min(6, "Senha deve ter no mínimo 6 caracteres");

/**
 * Nome com validação básica
 */
export const nameSchema = z
  .string({
    required_error: "O nome é obrigatório",
  })
  .min(2, "Nome deve ter no mínimo 2 caracteres")
  .max(255, "Nome não pode ter mais de 255 caracteres")
  .trim();

/**
 * Telefone brasileiro
 */
export const phoneSchema = z
  .string()
  .regex(
    /^(\+55\s?)?(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/,
    "Telefone deve ser um número de telefone válido",
  )
  .optional()
  .or(z.literal(""));

/**
 * URL
 */
export const urlSchema = z
  .string()
  .url("URL deve ser um endereço válido")
  .optional()
  .or(z.literal(""));

/**
 * Número positivo
 */
export const positiveNumberSchema = z
  .number()
  .positive("Número deve ser positivo");

/**
 * Número não-negativo
 */
export const nonNegativeNumberSchema = z
  .number()
  .nonnegative("Número não pode ser negativo");

/**
 * Descrição/texto longo
 */
export const descriptionSchema = z
  .string()
  .max(2000, "Descrição não pode ter mais de 2000 caracteres")
  .optional()
  .or(z.literal(""));

// ===== IDS =====

/**
 * ID de usuário
 */
export const userIdSchema = z
  .string()
  .uuid("ID do usuário deve ser um UUID válido");

/**
 * ID de empresa
 */
export const empresaIdSchema = z
  .string()
  .uuid("ID da empresa deve ser um UUID válido");

/**
 * ID de lead
 */
export const leadIdSchema = z
  .string()
  .uuid("ID do lead deve ser um UUID válido");

/**
 * ID de propriedade
 */
export const propertyIdSchema = z
  .string()
  .uuid("ID da propriedade deve ser um UUID válido");

/**
 * ID de stage
 */
export const stageIdSchema = z
  .string()
  .uuid("ID do stage deve ser um UUID válido");

/**
 * ID de corretor
 */
export const corretorIdSchema = z
  .string()
  .uuid("ID do corretor deve ser um UUID válido");

// ===== PAGINAÇÃO =====

/**
 * Parâmetros de paginação
 */
export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive("Página deve ser um número positivo")
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1, "Limite deve ser no mínimo 1")
    .max(100, "Limite não pode ser maior que 100")
    .default(10),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

// ===== FILTROS =====

/**
 * Filtro de data
 */
export const dateFilterSchema = z.object({
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
});

export type DateFilter = z.infer<typeof dateFilterSchema>;

// ===== ROLES USERS =====

export const roleSchema = z
  .enum([...USER_ROLES_OPTIONS] as [string, ...string[]], {
    required_error: "O cargo (role) é obrigatório",
    invalid_type_error: "O cargo deve ser uma string",
  })
  .default(USER_ROLES_OPTIONS[0]);

export type UserRole = z.infer<typeof roleSchema>;

// ===== RESPOSTA PADRÃO =====

/**
 * Resposta paginada genérica
 */
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    data: z.array(dataSchema),
    pagination: z.object({
      page: z.number(),
      limit: z.number(),
      total: z.number(),
      pages: z.number(),
    }),
  });

/**
 * Resposta de erro padrão
 */
export const errorResponseSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  timestamp: z.string().datetime().optional(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
