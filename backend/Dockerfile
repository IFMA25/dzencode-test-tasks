FROM node:20-alpine

ENV NODE_ENV=production

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json ./backend/

RUN pnpm install --frozen-lockfile --prod --ignore-scripts --filter backend

COPY backend ./backend

USER node

EXPOSE 4000

CMD ["node", "backend/src/server.js"]
