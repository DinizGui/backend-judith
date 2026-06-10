import axios, { AxiosInstance } from "axios";
import { env } from "../config/env.js";

const http: AxiosInstance = axios.create({
  baseURL: env.EVOLUTION_API_URL,
  timeout: 15_000,
  headers: { apikey: env.EVOLUTION_API_KEY },
});

// Doc: POST /message/sendText/{instance}
export async function sendText(toNumber: string, text: string): Promise<void> {
  await http.post(`/message/sendText/${env.EVOLUTION_INSTANCE}`, {
    number: toNumber,
    text,
  });
}

// "Digitando..." enquanto a JUDITH pensa — UX bem mais natural no WhatsApp.
// Doc: POST /chat/sendPresence/{instance}
export async function sendTyping(toNumber: string, durationMs = 2_000): Promise<void> {
  try {
    await http.post(`/chat/sendPresence/${env.EVOLUTION_INSTANCE}`, {
      number: toNumber,
      presence: "composing",
      delay: durationMs,
    });
  } catch {
    // presence é cosmético — não falha o fluxo
  }
}
