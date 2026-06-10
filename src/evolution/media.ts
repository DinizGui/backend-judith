import axios from "axios";
import { env } from "../config/env.js";

// Baixa o conteúdo de uma mídia (áudio, imagem, doc) recebida via webhook.
// Endpoint: POST /chat/getBase64FromMediaMessage/{instance}
// Body: { message: { key: {...}, message: {...} } }
// Doc: https://doc.evolution-api.com/v2/pt/chat#downloadmediafrommessage
export async function downloadMediaBase64(messageKey: {
  remoteJid: string;
  fromMe: boolean;
  id: string;
}): Promise<{ base64: string; mimetype: string } | null> {
  try {
    const resp = await axios.post(
      `${env.EVOLUTION_API_URL}/chat/getBase64FromMediaMessage/${env.EVOLUTION_INSTANCE}`,
      { message: { key: messageKey }, convertToMp4: false },
      { headers: { apikey: env.EVOLUTION_API_KEY }, timeout: 30_000 }
    );
    const data = resp.data;
    if (!data?.base64) return null;
    return { base64: data.base64, mimetype: data.mimetype ?? "application/octet-stream" };
  } catch {
    return null;
  }
}
