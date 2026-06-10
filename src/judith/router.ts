import { ModelTier } from "@prisma/client";

// Roteamento de modelos por intenção (Seção 4.1 do briefing v6).
// Sonnet é o modelo "caro" e fica reservado para casos onde a qualidade
// de raciocínio jurídico importa. Tudo o mais vai para Haiku.

const SONNET_TRIGGERS_INTENT = [
  // Análise / redação de contrato — sempre Sonnet
  "analisa este contrato",
  "analisa esse contrato",
  "analisar contrato",
  "olhar contrato",
  "revisar contrato",
  "redigir",
  "redija",
  "elaborar contrato",
  "fazer um contrato",
  "fazer uma notificação",
  "escrever contrato",
  "minuta",
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
  reason: string;
  attachedDocument: boolean;
};

export function routeIntent(input: {
  text: string;
  hasAttachment: boolean;
}): RouteDecision {
  const normalized = input.text.toLowerCase();

  // Anexo (PDF/imagem de contrato) = análise = Sonnet
  if (input.hasAttachment) {
    return {
      tier: ModelTier.SONNET,
      reason: "anexo enviado — análise de documento",
      attachedDocument: true,
    };
  }

  for (const kw of SONNET_TRIGGERS_INTENT) {
    if (normalized.includes(kw)) {
      return {
        tier: ModelTier.SONNET,
        reason: `intenção de redação/análise detectada: "${kw}"`,
        attachedDocument: false,
      };
    }
  }

  for (const kw of SONNET_TRIGGERS_EMOTIONAL) {
    if (normalized.includes(kw)) {
      return {
        tier: ModelTier.SONNET,
        reason: `contexto emocional/grave detectado: "${kw}"`,
        attachedDocument: false,
      };
    }
  }

  return {
    tier: ModelTier.HAIKU,
    reason: "dúvida simples/factual",
    attachedDocument: false,
  };
}
