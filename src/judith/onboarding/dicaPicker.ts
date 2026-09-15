import { TipoEmpresa } from "@prisma/client";
import { prisma } from "../../db/client.js";
import { DICAS_BANCO } from "./dicas.js";

// Garante que as dicas existem no banco. Idempotente — cria só o que falta.
async function seedDicasSeNecessario(): Promise<void> {
  const total = await prisma.tipDicaOnboarding.count();
  if (total > 0) return;

  const perfis: TipoEmpresa[] = ["MEI", "ME", "EPP", "AUTONOMO"];
  for (const perfil of perfis) {
    const textos = DICAS_BANCO[perfil];
    await prisma.tipDicaOnboarding.createMany({
      data: textos.map((texto) => ({ perfil, texto })),
      skipDuplicates: true,
    });
  }
}

// Seleciona uma dica não usada pelo userId, marca como usada e retorna.
export async function pegarDicaParaUsuario(
  userId: string,
  perfil: TipoEmpresa
): Promise<string> {
  await seedDicasSeNecessario();

  // usadoPor é Json (lista de userIds) — MySQL não tem String[], então filtra em memória
  const todas = await prisma.tipDicaOnboarding.findMany({
    where: { perfil, ativo: true },
  });
  const usadoPorDe = (d: { usadoPor: unknown }): string[] =>
    Array.isArray(d.usadoPor) ? (d.usadoPor as string[]) : [];
  const disponiveis = todas.filter((d) => !usadoPorDe(d).includes(userId));

  // Esgotou — recomeça resetando histórico desse usuário no perfil
  const pool = disponiveis.length > 0 ? disponiveis : todas;

  if (pool.length === 0) {
    return "Aproveita pra explorar — é só me chamar sempre que precisar.";
  }

  const escolhida = pool[Math.floor(Math.random() * pool.length)]!;

  await prisma.tipDicaOnboarding.update({
    where: { id: escolhida.id },
    data: { usadoPor: [...usadoPorDe(escolhida), userId] },
  });

  return escolhida.texto;
}
