# prompts/

Aqui ficam os prompts do fundador (`JUDITH-prompt-unico-PRODUCAO.md` e os classificadores).
São **confidenciais** e ficam fora do git (`.gitignore`).

- Em produção: a pasta é montada como volume em `/app/prompts` (ver `docker-compose.yml` em `/opt/judith-backend` na VPS).
- Pra atualizar: substituir o `.md` na VPS e reiniciar o container. O texto nunca é editado pelo dev.
- O backend lê `JUDITH-prompt-unico-PRODUCAO.md` no boot e separa as Seções A/B/C (`src/judith/prompts/principal.ts`).
