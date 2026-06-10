import { FastifyInstance } from "fastify";

// Páginas mínimas de Termos e Privacidade — placeholders pra o link do onboarding
// não dar 404. Substituir pelo HTML/texto oficial depois.

const PAGE_LAYOUT = (titulo: string, corpoHtml: string) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo} — JUDITH</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 720px; margin: 0 auto; padding: 32px 24px 80px; line-height: 1.6; color: #1f2937; background: #fafafa; }
  h1 { font-size: 28px; margin: 0 0 8px; }
  h2 { font-size: 18px; margin: 28px 0 8px; color: #047857; }
  .muted { color: #6b7280; font-size: 14px; margin-bottom: 24px; }
  p, li { font-size: 15px; }
  ul { padding-left: 18px; }
  footer { margin-top: 48px; font-size: 12px; color: #6b7280; text-align: center; }
  .nav { display: flex; gap: 12px; margin-top: 16px; }
  .nav a { color: #047857; text-decoration: none; font-size: 14px; }
</style>
</head>
<body>
  <h1>${titulo}</h1>
  <div class="muted">Versão preliminar · ${new Date().toLocaleDateString("pt-BR")}</div>
  ${corpoHtml}
  <div class="nav">
    <a href="/termos">Termos de Uso</a> ·
    <a href="/privacidade">Política de Privacidade</a>
  </div>
  <footer>JUDITH — Assistente jurídica e executiva via WhatsApp</footer>
</body>
</html>`;

const TERMOS_HTML = `
<p>Estes Termos de Uso regulam a sua relação com a JUDITH, assistente jurídica e executiva via WhatsApp.</p>

<h2>1. O que a JUDITH é</h2>
<p>A JUDITH é uma assistente movida por inteligência artificial que presta <strong>informações de caráter educativo e orientativo</strong> sobre temas jurídicos, administrativos e empresariais do dia a dia. Ela <strong>não substitui a consulta a um advogado</strong> e não presta consultoria, assessoria ou direção jurídica.</p>

<h2>2. Limites do serviço</h2>
<ul>
  <li>As respostas têm finalidade informativa e podem conter erros ou imprecisões — você deve avaliar antes de agir.</li>
  <li>Em casos complexos, a JUDITH recomendará procurar um advogado.</li>
  <li>Direito Penal, Direito de Família, Direito Eleitoral, Direito Militar, Direito Indígena, Direito Aduaneiro e Direito Internacional estão fora do escopo do serviço.</li>
</ul>

<h2>3. Documentos gerados</h2>
<p>Contratos, notificações e demais documentos redigidos pela JUDITH são modelos de referência baseados em legislação vigente. Sua aplicação a um caso concreto pode requerer ajustes que escapam ao serviço.</p>

<h2>4. Planos e cobrança</h2>
<p>O acesso pode ser feito por trial, planos de assinatura ou uso avulso, conforme oferta vigente. Cancelamentos mantêm o acesso até o fim do ciclo já pago, sem reembolso proporcional.</p>

<h2>5. Responsabilidade</h2>
<p>A JUDITH não se responsabiliza por decisões tomadas exclusivamente com base nas informações fornecidas pelo serviço. O uso é por sua conta e risco.</p>

<h2>6. Aceite</h2>
<p>Ao responder "SIM" no WhatsApp para o pedido de aceite, você confirma ter lido e concordado com estes Termos e com a Política de Privacidade.</p>
`;

const PRIVACIDADE_HTML = `
<p>Esta Política descreve como a JUDITH trata seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>

<h2>1. Quais dados coletamos</h2>
<ul>
  <li><strong>Número de WhatsApp</strong> — identificador único da sua conta.</li>
  <li><strong>Nome</strong> — quando você informa.</li>
  <li><strong>Perfil empresarial</strong> — tipo (MEI/ME/EPP/Autônomo), ramo, cidade.</li>
  <li><strong>Mensagens trocadas</strong> — texto das conversas, para manter o contexto e permitir auditoria de qualidade.</li>
  <li><strong>Áudios</strong> — transcritos e descartados após o processamento.</li>
</ul>

<h2>2. Para que usamos</h2>
<ul>
  <li>Fornecer as respostas e funcionalidades do serviço.</li>
  <li>Lembretes e acompanhamento de obrigações.</li>
  <li>Melhoria contínua do produto.</li>
</ul>

<h2>3. Com quem compartilhamos</h2>
<p>Apenas com provedores essenciais à operação (modelo de IA, transcrição de áudio, hospedagem). Não vendemos seus dados.</p>

<h2>4. Seus direitos</h2>
<p>Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento, mandando uma mensagem no próprio WhatsApp.</p>

<h2>5. Segurança</h2>
<p>Dados armazenados em banco com acesso restrito e tráfego criptografado em todas as integrações.</p>
`;

export function registerLegalRoutes(app: FastifyInstance) {
  app.get("/termos", async (_req, reply) => {
    reply.type("text/html; charset=utf-8");
    return PAGE_LAYOUT("Termos de Uso", TERMOS_HTML);
  });

  app.get("/privacidade", async (_req, reply) => {
    reply.type("text/html; charset=utf-8");
    return PAGE_LAYOUT("Política de Privacidade", PRIVACIDADE_HTML);
  });
}
