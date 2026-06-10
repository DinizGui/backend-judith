"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [step, setStep] = useState<"form" | "checkout">("form");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    senha: "",
    aceiteTermos: false,
  });

  const podeAvançar =
    form.nome.length >= 2 &&
    /@/.test(form.email) &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    form.senha.length >= 6 &&
    form.aceiteTermos;

  if (step === "checkout") {
    return (
      <Checkout
        nome={form.nome}
        whatsapp={form.whatsapp}
        onBack={() => setStep("form")}
      />
    );
  }

  return (
    <main className="min-h-screen">
      <header className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between border-b border-line">
        <Link href="/" className="text-base font-semibold tracking-tight">
          JUDITH
        </Link>
        <Link href="/planos" className="text-sm text-muted hover:text-ink">
          Voltar pros planos
        </Link>
      </header>

      <section className="max-w-md mx-auto px-6 py-12">
        <h1 className="text-2xl font-semibold tracking-tight">
          Crie sua conta
        </h1>
        <p className="mt-2 text-sm text-muted">
          Trial de 30 dias incluso. Não pedimos cartão agora.
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (podeAvançar) setStep("checkout");
          }}
        >
          <Field
            label="Nome"
            value={form.nome}
            onChange={(v) => setForm({ ...form, nome: v })}
            placeholder="Como podemos te chamar"
          />
          <Field
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
            placeholder="voce@email.com"
          />
          <Field
            label="WhatsApp"
            value={form.whatsapp}
            onChange={(v) => setForm({ ...form, whatsapp: v })}
            placeholder="(11) 99999-9999"
            hint="É por esse número que você vai conversar com a JUDITH."
          />
          <Field
            label="Senha"
            type="password"
            value={form.senha}
            onChange={(v) => setForm({ ...form, senha: v })}
            placeholder="Mínimo 6 caracteres"
          />

          <label className="flex items-start gap-2 text-sm pt-2">
            <input
              type="checkbox"
              checked={form.aceiteTermos}
              onChange={(e) => setForm({ ...form, aceiteTermos: e.target.checked })}
              className="mt-0.5"
            />
            <span className="text-muted">
              Li e aceito os{" "}
              <Link href="/termos" className="text-accent underline">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link href="/privacidade" className="text-accent underline">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={!podeAvançar}
            className="w-full rounded-full bg-ink text-paper px-5 py-3 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90"
          >
            Continuar
          </button>
        </form>
      </section>
    </main>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-muted mb-1.5">
        {props.label}
      </label>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
      />
      {props.hint && <p className="mt-1 text-xs text-muted">{props.hint}</p>}
    </div>
  );
}

function Checkout({
  nome,
  whatsapp,
  onBack,
}: {
  nome: string;
  whatsapp: string;
  onBack: () => void;
}) {
  const [metodo, setMetodo] = useState<"pix" | "card">("pix");

  return (
    <main className="min-h-screen">
      <header className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between border-b border-line">
        <Link href="/" className="text-base font-semibold tracking-tight">
          JUDITH
        </Link>
        <button onClick={onBack} className="text-sm text-muted hover:text-ink">
          ← Voltar
        </button>
      </header>

      <section className="max-w-md mx-auto px-6 py-12">
        <p className="text-xs uppercase tracking-widest text-accent font-medium mb-2">
          quase lá, {nome.split(" ")[0]}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          Confirmar plano e pagar
        </h1>

        <div className="mt-6 rounded-xl border border-line bg-white p-4">
          <div className="flex justify-between text-sm">
            <span>Plano Essencial</span>
            <span className="font-medium">R$ 29,90/mês</span>
          </div>
          <div className="mt-1 text-xs text-accent">
            🎁 30 dias grátis — cobrança só a partir de {trinta()}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-xs font-medium text-muted mb-2">Forma de pagamento</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMetodo("pix")}
              className={`rounded-xl border p-3 text-left ${
                metodo === "pix" ? "border-ink bg-gray-50" : "border-line bg-white"
              }`}
            >
              <div className="text-sm font-medium">PIX</div>
              <div className="text-xs text-muted mt-1">
                QR Code com renovação automática
              </div>
            </button>
            <button
              onClick={() => setMetodo("card")}
              className={`rounded-xl border p-3 text-left ${
                metodo === "card" ? "border-ink bg-gray-50" : "border-line bg-white"
              }`}
            >
              <div className="text-sm font-medium">Cartão de crédito</div>
              <div className="text-xs text-muted mt-1">
                Cobrança mensal automática
              </div>
            </button>
          </div>
        </div>

        {metodo === "pix" ? (
          <div className="mt-6 rounded-xl border border-dashed border-line bg-white p-6 text-center">
            <div className="aspect-square w-40 mx-auto bg-gray-100 rounded grid place-items-center text-[10px] text-muted">
              QR Code PIX<br />(gerado após confirmar)
            </div>
            <p className="mt-4 text-xs text-muted">
              Após pagar, a JUDITH te chama no <br />
              WhatsApp <strong>{whatsapp}</strong>.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-line bg-white p-6 text-center text-sm text-muted">
            Checkout seguro hospedado pelo Mercado Pago<br />
            <span className="text-xs">(seus dados não passam pelo nosso servidor)</span>
          </div>
        )}

        <button className="mt-6 w-full rounded-full bg-ink text-paper px-5 py-3 text-sm font-medium hover:opacity-90">
          {metodo === "pix"
            ? "Confirmar e gerar PIX"
            : "Continuar pro checkout"}
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          Cancele a qualquer momento, sem ligação.
        </p>
      </section>
    </main>
  );
}

function trinta(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toLocaleDateString("pt-BR");
}
