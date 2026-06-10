import Anthropic from "@anthropic-ai/sdk";
import { ModelTier, User } from "@prisma/client";
import { env } from "../config/env.js";
import { PROMPT_PRINCIPAL } from "./prompts/principal.js";

const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type AskInput = {
  tier: ModelTier;
  user: User | null;
  history: ChatTurn[];
  userMessage: string;
};

export type AskOutput = {
  text: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
};

function modelIdFor(tier: ModelTier): string {
  return tier === ModelTier.SONNET ? env.JUDITH_MODEL_SONNET : env.JUDITH_MODEL_HAIKU;
}

function userProfileBlock(user: User | null): string {
  if (!user) {
    return "Perfil do usuário: ainda não cadastrado — peça o aceite dos termos e o tipo de empresa antes de responder substantivamente.";
  }
  const linhas: string[] = ["Perfil do usuário:"];
  if (user.nome) linhas.push(`- Nome: ${user.nome}`);
  if (user.tipoEmpresa) linhas.push(`- Tipo: ${user.tipoEmpresa}`);
  if (user.ramo) linhas.push(`- Ramo: ${user.ramo}`);
  if (user.cidade) linhas.push(`- Cidade: ${user.cidade}`);
  linhas.push(`- Plano: ${user.plano}`);
  return linhas.join("\n");
}

export async function askJudith(input: AskInput): Promise<AskOutput> {
  const model = modelIdFor(input.tier);

  // System em 2 blocos: o primeiro é cacheado (3k tokens estáveis = hit rate alto);
  // o segundo é o perfil enxuto, que muda por usuário e fica fora do cache.
  // Referência: Seção 4.2 do briefing v6.
  const system: Anthropic.TextBlockParam[] = [
    {
      type: "text",
      text: PROMPT_PRINCIPAL,
      cache_control: { type: "ephemeral" },
    },
    {
      type: "text",
      text: userProfileBlock(input.user),
    },
  ];

  const messages: Anthropic.MessageParam[] = [
    ...input.history.map((t) => ({ role: t.role, content: t.content })),
    { role: "user" as const, content: input.userMessage },
  ];

  const response = await client.messages.create({
    model,
    max_tokens: 1024,
    system,
    messages,
  });

  const firstBlock = response.content[0];
  const text =
    firstBlock && firstBlock.type === "text" ? firstBlock.text : "";

  const usage = response.usage;
  return {
    text,
    model,
    inputTokens: usage.input_tokens,
    outputTokens: usage.output_tokens,
    cacheReadTokens: usage.cache_read_input_tokens ?? 0,
    cacheWriteTokens: usage.cache_creation_input_tokens ?? 0,
  };
}
