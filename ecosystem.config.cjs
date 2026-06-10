// PM2 — gerencia backend + admin + web num único supervisor.
// Comandos úteis:
//   pnpm pm2 start ecosystem.config.cjs    (ou npx pm2 ...)
//   npx pm2 logs                           — vê logs de todos
//   npx pm2 logs backend                   — só de um
//   npx pm2 restart backend                — religa só o backend (NÃO derruba admin/web)
//   npx pm2 status                         — quem está no ar
//   npx pm2 stop all                       — para tudo

module.exports = {
  apps: [
    {
      name: "backend",
      cwd: __dirname,
      script: "node_modules/tsx/dist/cli.mjs",
      args: "watch src/server.ts",
      env: { NODE_ENV: "development" },
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
      restart_delay: 1000,
    },
    {
      name: "admin",
      cwd: __dirname + "/admin",
      script: "node_modules/next/dist/bin/next",
      args: "dev -p 3001",
      env: { NODE_ENV: "development" },
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
    },
    {
      name: "web",
      cwd: __dirname + "/web",
      script: "node_modules/next/dist/bin/next",
      args: "dev -p 3002",
      env: { NODE_ENV: "development" },
      autorestart: true,
      max_restarts: 10,
      min_uptime: "10s",
    },
  ],
};
