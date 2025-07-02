FROM node:24-alpine AS base

RUN apk add --no-cache libc6-compat

# Development build does not depend on any stages

FROM base AS development

WORKDIR /apps/web/

COPY apps/web/package*.json .

RUN npm ci

COPY apps/web/eslint.config.mjs eslint.config.mjs
COPY apps/web/next-env.d.ts next-env.d.ts
COPY apps/web/next.config.ts next.config.ts
COPY apps/web/postcss.config.mjs postcss.config.mjs
COPY apps/web/tailwind.config.ts tailwind.config.ts
COPY apps/web/tsconfig.json tsconfig.json

EXPOSE 3001

ENV PORT=3001
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

CMD ["sh", "-c", "if [[ \"$USE_WEBPACK\" = \"1\" || \"$USE_WEBPACK\" = \"true\" ]]; then npm run dev-webpack; else npm run dev; fi"]

FROM base AS deps

WORKDIR /apps/web/

COPY apps/web/package*.json .

RUN npm ci

FROM base AS builder

WORKDIR /apps/web/

COPY apps/web/src ./src
COPY apps/web/public ./public
COPY --from=deps /apps/web/node_modules ./node_modules
COPY --from=deps /apps/web/package*.json ./

COPY apps/web/eslint.config.mjs eslint.config.mjs
COPY apps/web/next-env.d.ts next-env.d.ts
COPY apps/web/next.config.ts next.config.ts
COPY apps/web/postcss.config.mjs postcss.config.mjs
COPY apps/web/tailwind.config.ts tailwind.config.ts
COPY apps/web/tsconfig.json tsconfig.json

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM base AS production

WORKDIR /apps/web

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /apps/web/public ./
COPY --from=builder --chown=nextjs:nodejs /apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]