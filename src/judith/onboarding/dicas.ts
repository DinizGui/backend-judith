import { TipoEmpresa } from "@prisma/client";

// Banco de dicas proativas — Seção 8 do JUDITH-onboarding-v1.
// 5 dicas por perfil. Baseadas em conhecimento jurídico geral.
// Quando o RAG estiver pronto, podemos validar contra a base.
export const DICAS_BANCO: Record<TipoEmpresa, string[]> = {
  MEI: [
    "MEI pode ser contratado como PJ por empresas — mas se trabalhar com exclusividade e horário fixo por longo período, você pode ter o vínculo empregatício reconhecido na Justiça, o que garante todos os seus direitos trabalhistas.",
    "Funcionário do MEI tem todos os direitos trabalhistas: férias, 13º, FGTS, aviso prévio. Não é diferente de empresa grande.",
    "MEI não é obrigado a ter contador — mas a Declaração Anual (DASN-SIMEI) é obrigatória todo ano até 31 de maio, mesmo que não tenha faturado nada. É gratuita e feita no próprio portal.",
    "Se o seu faturamento anual ultrapassar R$ 81.000, você sai do MEI automaticamente. Vale planejar antes de acontecer.",
    "Rescisão do funcionário do MEI é julgada na Vara do Trabalho como qualquer empresa — sem tratamento diferenciado por ser MEI.",
  ],
  ME: [
    "Contrato com fornecedor sem cláusula de multa por rescisão pode deixar a empresa sem proteção se o fornecedor desaparecer ou não cumprir o combinado.",
    "Contrato de experiência não pode ultrapassar 90 dias. Após isso, vira automaticamente contrato indeterminado — com todas as obrigações de rescisão.",
    "Qualquer alteração no contrato social — mudança de endereço, entrada ou saída de sócio, mudança de atividade — precisa ser registrada na Junta Comercial. Fazer errado pode gerar problemas sérios.",
    "Empresa sem alvará de funcionamento pode ser autuada e fechada a qualquer momento pela fiscalização municipal — independente do tempo que está aberta.",
    "Ação trabalhista pode ser movida em até 2 anos após o encerramento do contrato. Empresa que fechou ainda pode ser acionada.",
  ],
  EPP: [
    "Contrato com fornecedor sem cláusula de multa por rescisão pode deixar a empresa sem proteção se o fornecedor desaparecer ou não cumprir o combinado.",
    "Contrato de experiência não pode ultrapassar 90 dias. Após isso, vira automaticamente contrato indeterminado — com todas as obrigações de rescisão.",
    "Qualquer alteração no contrato social — mudança de endereço, entrada ou saída de sócio, mudança de atividade — precisa ser registrada na Junta Comercial. Fazer errado pode gerar problemas sérios.",
    "Empresa sem alvará de funcionamento pode ser autuada e fechada a qualquer momento pela fiscalização municipal — independente do tempo que está aberta.",
    "Ação trabalhista pode ser movida em até 2 anos após o encerramento do contrato. Empresa que fechou ainda pode ser acionada.",
  ],
  AUTONOMO: [
    "Contrato de prestação de serviço não precisa de reconhecimento de firma para ter validade legal — assinatura simples já basta.",
    "Mesmo sem CNPJ, você tem direito a ter contrato escrito com seus clientes. Contrato não é coisa só de empresa — é sua proteção se o cliente não pagar ou negar o que foi combinado.",
    "Quando você presta serviço pra uma empresa, ela pode reter ISS na fonte — isso é legal e aparece descontado no pagamento. Você tem direito ao comprovante de retenção.",
    "Honorários combinados só de forma verbal têm valor legal — mas são difíceis de provar se der problema. Sempre documente: contrato, e-mail, WhatsApp. Print de conversa com aceitação é prova válida, e recibo assinado pelo cliente é prova de quitação.",
    "Autônomo que presta serviço exclusivamente para uma única empresa por longo período, com horário fixo e subordinação, pode ter vínculo empregatício reconhecido na Justiça — o que garante todos os direitos trabalhistas.",
  ],
};
