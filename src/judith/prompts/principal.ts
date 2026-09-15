// Prompt único da JUDITH — carregado do arquivo entregue pelo fundador
// (prompts/JUDITH-prompt-unico-PRODUCAO.md). O texto NÃO é editado pelo dev:
// ajuste de conteúdo é mudança de produto e passa pelo fundador (00-LEIA-ME).
//
// Seção A → injetada em toda conversa (bloco estático, cacheado).
// Seção B → só em redação de documento.  Seção C → só em análise de contrato.
// A ordem estático → dinâmico é o que ativa o prompt caching (spec §1 e §7).

import { readFileSync } from "node:fs";
import path from "node:path";

// Versão = data da entrega consolidada. Mudou o .md → mudar aqui (quebra o cache de propósito).
export const JUDITH_VERSAO = "v22072026";

// Build é CommonJS: __dirname resolve pra src/judith/prompts (tsx) ou dist/judith/prompts (node).
const ARQUIVO_PROMPT = path.resolve(__dirname, "../../../prompts/JUDITH-prompt-unico-PRODUCAO.md");

type Secoes = { A: string; B: string; C: string };

// Remove só o que é anotação interna do documento (uso/injeção e rodapés),
// sem tocar no conteúdo das regras.
function limparSecao(bruto: string): string {
  const linhas = bruto.split("\n").filter((l) => {
    const t = l.trim();
    if (/^\*\*(Ativo em todas as conversas|Injetado sob demanda)/.test(t)) return false;
    if (/^\*JUDITH v.*Confidencial\*$/.test(t)) return false;
    return true;
  });
  return linhas
    .join("\n")
    .replace(/^(\s*---\s*\n)+/, "")
    .replace(/(\n\s*---\s*)+\s*$/, "")
    .trim();
}

function carregarSecoes(): Secoes {
  const md = readFileSync(ARQUIVO_PROMPT, "utf8").replace(/\r\n/g, "\n");
  const partes = md.split(/^## SEÇÃO ([ABC]) — .*$/m);
  const achadas: Partial<Secoes> = {};
  for (let i = 1; i + 1 < partes.length; i += 2) {
    const letra = partes[i] as keyof Secoes;
    achadas[letra] = limparSecao(partes[i + 1] ?? "");
  }
  for (const letra of ["A", "B", "C"] as const) {
    const texto = achadas[letra];
    if (!texto || texto.length < 1000) {
      throw new Error(
        `Prompt: Seção ${letra} não encontrada ou vazia em ${ARQUIVO_PROMPT}`
      );
    }
  }
  return achadas as Secoes;
}

const secoes = carregarSecoes();

/** Seção A — Prompt Principal. Ativo em todas as conversas. */
export const PROMPT_PRINCIPAL = secoes.A;
/** Seção B — Redação de documentos. Só quando o usuário pede pra redigir. */
export const PROMPT_REDACAO = secoes.B;
/** Seção C — Análise de contratos. Só quando o usuário envia contrato pra analisar. */
export const PROMPT_ANALISE = secoes.C;
