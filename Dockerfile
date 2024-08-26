FROM node:20-alpine AS base
RUN apk add --no-cache python3 make g++ libc6-compat pkgconfig

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN pnpm config set --global "@tiptap-pro:registry" https://registry.tiptap.dev/
RUN pnpm config set "//registry.tiptap.dev/:_authToken" Q1t0XltVA/YyR2wmmd/ItSnZ+ByL/CKuKjDGF0VBlGVjBxPd6Mt0u6SL7mObc/Op
RUN \
  if [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
ARG BRANCH_NAME
COPY .env.development .env.development
COPY .env.test .env.test
COPY .env.production .env.production
RUN if [ "$BRANCH_NAME" = "test-v2" ]; then cp .env.development .env.production; fi
RUN if [ "$BRANCH_NAME" = "staging-v2" ]; then cp .env.test .env.production; fi

RUN pnpm build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 80

ENV PORT=80
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
