FROM node:18.17.1-alpine3.17 AS base

# 1. Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./
RUN npm config set "@tiptap-pro:registry" https://registry.tiptap.dev/
RUN npm config set "//registry.tiptap.dev/:_authToken" Q1t0XltVA/YyR2wmmd/ItSnZ+ByL/CKuKjDGF0VBlGVjBxPd6Mt0u6SL7mObc/Op
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

RUN yarn husky-install

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
ARG BRANCH_NAME
COPY .env.deployment .env.deployment
COPY .env.pre .env.pre
COPY .env.production .env.production
RUN if [ "$BRANCH_NAME" = "test" ]; then cp .env.deployment .env.production; fi
RUN if [ "$BRANCH_NAME" = "staging" ]; then cp .env.pre .env.production; fi

RUN yarn build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


USER nextjs

EXPOSE 80

ENV PORT 80
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
