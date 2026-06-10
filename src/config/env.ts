import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  LOG_LEVEL: z.string().default("info"),
  PUBLIC_URL: z.string().url().default("http://localhost:3000"),

  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY obrigatória"),
  JUDITH_MODEL_HAIKU: z.string().default("claude-haiku-4-5-20251001"),
  JUDITH_MODEL_SONNET: z.string().default("claude-sonnet-4-6"),

  DATABASE_URL: z.string().min(1),

  EVOLUTION_API_URL: z.string().url(),
  EVOLUTION_API_KEY: z.string().min(1),
  EVOLUTION_INSTANCE: z.string().min(1),

  OPENAI_API_KEY: z.string().optional(),
  JUDITH_DOMAIN: z.string().default("judith.com.br"),
  // Sobrescreve a URL dos termos/privacidade (útil em dev com ngrok).
  // Se não definido, usa https://{JUDITH_DOMAIN}/termos
  URL_TERMOS: z.string().url().optional(),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error("Erro nas variáveis de ambiente:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
