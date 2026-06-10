import Link from "next/link";

type Plano = {
  id: string;
  nome: string;
  preco: string;
  destaque?: boolean;
  inclui: string[];
};

const PLANOS: Plano[] = [
  {
    id: "essencial",
    nome: "Essencial",
    preco: "R$ 29,90",
    inclui: [
      "30 dúvidas / mês",
      "2 análises de contrato",
      "1 redação de documento",
      "30 lembretes ativos",
    ],
  },
  {
    id: "intermediario",
    nome: "Intermediário",
    preco: "R$ 49,90",
    inclui: [
      "Dúvidas ilimitadas",
      "5 análises de contrato",
      "3 redações de documento",
      "60 lembretes ativos",
    ],
  },
  {
    id: "profissional",
    nome: "Profissional",
    preco: "R$ 89,90",
    destaque: true,
    inclui: [
      "Dúvidas ilimitadas",
      "15 análises de contrato",
      "8 redações de documento",
      "150 lembretes ativos",
    ],
  },
  {
    id: "completo",
    nome: "Completo",
    preco: "R$ 159,90",
    inclui: [
      "Dúvidas ilimitadas",
      "Análises ilimitadas",
      "20 redações de documento",
      "400 lembretes ativos",
    ],
  },
  {
    id: "empresarial",
    nome: "Empresarial",
    preco: "R$ 349,90",
    inclui: [
      "Tudo ilimitado",
      "Múltiplos usuários na conta",
      "Suporte prioritário",
    ],
  },
];

export default function PlanosPage() {
  return (
    <main className="min-h-screen">
      <header className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between border-b border-line">
        <Link href="/" className="text-base font-semibold tracking-tight">
          JUDITH
        </Link>
        <Link href="/signup" className="text-sm text-muted hover:text-ink">
          Já tenho conta
        </Link>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Escolha o plano da sua operação
        </h1>
        <p className="mt-3 text-muted">
          Todos os planos têm acesso completo. A diferença é só volume.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PLANOS.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border p-5 flex flex-col ${
                p.destaque
                  ? "border-accent bg-accentSoft/40"
                  : "border-line bg-white"
              }`}
            >
              {p.destaque && (
                <div className="text-xs text-accent font-semibold mb-2">
                  MAIS POPULAR
                </div>
              )}
              <h3 className="text-lg font-semibold">{p.nome}</h3>
              <div className="mt-2 text-2xl font-semibold">
                {p.preco}
                <span className="text-sm text-muted font-normal">/mês</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted flex-1">
                {p.inclui.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">·</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/signup?plano=${p.id}`}
                className={`mt-5 text-center rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  p.destaque
                    ? "bg-ink text-paper hover:opacity-90"
                    : "border border-line bg-white hover:bg-gray-50"
                }`}
              >
                Começar
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted">
          Trial de 30 dias do plano Essencial completo, sem cartão. Cancele
          quando quiser.
        </p>
      </section>
    </main>
  );
}
