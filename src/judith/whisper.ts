import OpenAI from "openai";
import { env } from "../config/env.js";

const client = env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: env.OPENAI_API_KEY })
  : null;

// Transcreve um áudio (base64) usando Whisper. Retorna null se OpenAI key faltar
// ou a chamada falhar.
export async function transcreverAudio(
  base64: string,
  mimetype: string
): Promise<string | null> {
  if (!client) return null;

  // Whisper aceita: mp3, mp4, mpeg, mpga, m4a, wav, webm, ogg, oga
  // WhatsApp audioMessage normalmente vem como audio/ogg; opus
  const ext = mimetypeParaExtensao(mimetype);
  const buffer = Buffer.from(base64, "base64");

  try {
    const file = await OpenAI.toFile(buffer, `audio.${ext}`, { type: mimetype });
    const resp = await client.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: "pt",
    });
    return resp.text.trim();
  } catch (err) {
    console.error("whisper.error", err);
    return null;
  }
}

function mimetypeParaExtensao(mime: string): string {
  if (mime.includes("ogg")) return "ogg";
  if (mime.includes("mp4")) return "mp4";
  if (mime.includes("mpeg") || mime.includes("mp3")) return "mp3";
  if (mime.includes("wav")) return "wav";
  if (mime.includes("webm")) return "webm";
  if (mime.includes("m4a")) return "m4a";
  return "ogg";
}
