import { ModelTier } from "@prisma/client";
import type { Funcao } from "./claude.js";

// Roteamento de modelos por intenção (Seção 4.1 do briefing v6).
// Sonnet é o modelo "caro" e fica reservado para casos onde a qualidade
// de raciocínio jurídico importa. Tudo o mais vai para Haiku.

// Análise de contrato → Seção C do prompt (+ Sonnet)
const ANALISE_TRIGGERS = [
  "analisa este contrato",
  "analisa esse contrato",
  "analisar contrato",
  "analisar esse contrato",
  "analisar este contrato",
  "análise do contrato",
  "analise do contrato",
  "olhar contrato",
  "olhar esse contrato",
  "revisar contrato",
  "revisar esse contrato",
  "revisa esse contrato",
  "dar uma olhada no contrato",
  "dá uma olhada no contrato",
];

// Redação de documento → Seção B do prompt (+ Sonnet)
const REDACAO_TRIGGERS = [
  "redigir",
  "redija",
  "redige",
  "elaborar contrato",
  "elaborar um contrato",
  "fazer um contrato",
  "fazer uma notificação",
  "montar um contrato",
  "montar contrato",
  "escrever contrato",
  "escrever um contrato",
  "minuta",
  "modelo de contrato",
  // Documentos processuais
  "petição",
  "contestação",
  "recurso",
  "réplica",
  "impugnação",
];

const SONNET_TRIGGERS_EMOTIONAL = [
  "perdi",
  "vou perder",
  "problema",
  "briga",
  "desespero",
  "fui processado",
  "fui notificado",
  "fui citado",
  "auto de infração",
  "inquérito",
  "audiência marcada",
  "fui ameaçado",
  "estou apavorad",
  "não sei o que fazer",
];

export type RouteDecision = {
  tier: ModelTier;
  funcao: Funcao;
  reason: string;
  attachedDocument: boolean;
};

export function routeIntent(input: {
  text: string;
  hasAttachment: boolean;
}): RouteDecision {
  const normalized = input.text.toLowerCase();

  // Anexo (PDF/imagem de contrato) = análise = Seção C + Sonnet
  if (input.hasAttachment) {
    return {
      tier: ModelTier.SONNET,
      funcao: "analise",
      reason: "anexo enviado — análise de documento",
      attachedDocument: true,
    };
  }

  for (const kw of ANALISE_TRIGGERS) {
    if (normalized.includes(kw)) {
      return {
        tier: ModelTier.SONNET,
        funcao: "analise",
        reason: `intenção de análise detectada: "${kw}"`,
        attachedDocument: false,
      };
    }
  }

  for (const kw of REDACAO_TRIGGERS) {
    if (normalized.includes(kw)) {
      return {
        tier: ModelTier.SONNET,
        funcao: "redacao",
        reason: `intenção de redação detectada: "${kw}"`,
        attachedDocument: false,
      };
    }
  }

  for (const kw of SONNET_TRIGGERS_EMOTIONAL) {
    if (normalized.includes(kw)) {
      return {
        tier: ModelTier.SONNET,
        funcao: "duvida",
        reason: `contexto emocional/grave detectado: "${kw}"`,
        attachedDocument: false,
      };
    }
  }

  return {
    tier: ModelTier.HAIKU,
    funcao: "duvida",
    reason: "dúvida simples/factual",
    attachedDocument: false,
  };
}
