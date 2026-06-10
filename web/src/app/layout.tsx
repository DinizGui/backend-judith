import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JUDITH — Assistente jurídica via WhatsApp",
  description: "Tire dúvidas, analise contratos e organize lembretes — direto no seu WhatsApp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
