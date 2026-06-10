import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-xs uppercase tracking-widest text-accent font-medium mb-4">
          assistente jurídica via whatsapp
        </p>
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
          A JUDITH cuida da parte<br />jurídica do seu negócio.
        </h1>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
          Tire dúvidas, analise contratos, redija documentos e organize prazos —
          tudo pelo WhatsApp, sem juridiquês.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/planos"
            className="inline-flex items-center justify-center rounded-full bg-ink text-paper px-6 py-3 text-sm font-medium hover:opacity-90 transition"
          >
            Ver planos
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-medium hover:bg-gray-50 transition"
          >
            Começar grátis por 30 dias
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted">
          Plano Essencial completo no trial — sem cartão de crédito.
        </p>
      </section>

      {/* Bullets */}
      <section className="max-w-5xl mx-auto px-6 py-12 border-t border-line">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              t: "Dúvidas claras",
              d: "Responde sobre obrigações, contratos, multas e direitos do seu negócio em linguagem do dia a dia.",
            },
            {
              t: "Análise de contratos",
              d: "Manda o PDF, ela aponta os pontos que merecem atenção antes de você assinar.",
            },
            {
              t: "Redação de documentos",
              d: "Contratos, notificações, declarações — redigidos do zero, em PDF pronto pra assinar.",
            },
          ].map((b) => (
            <div key={b.t}>
              <h3 className="text-base font-semibold mb-2">{b.t}</h3>
              <p className="text-sm text-muted leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-5xl mx-auto px-6 py-8 text-xs text-muted border-t border-line">
        © {new Date().getFullYear()} JUDITH · <Link href="/termos" className="hover:text-ink">Termos</Link> · <Link href="/privacidade" className="hover:text-ink">Privacidade</Link>
      </footer>
    </main>
  );
}
