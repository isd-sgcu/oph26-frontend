# Build stage
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# VITE_PUBLIC_* vars are baked into the JS bundle at build time
ARG VITE_PUBLIC_API_URL
ARG VITE_PUBLIC_GOOGLE_CLIENT_ID
ARG VITE_PUBLIC_GOOGLE_PROJECT_ID
ARG VITE_PUBLIC_GOOGLE_AUTH_URI
ARG VITE_PUBLIC_GOOGLE_TOKEN_URI
ARG VITE_PUBLIC_GOOGLE_AUTH_PROVIDER_X509_CERT_URL

RUN pnpm build

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output

ENV NODE_ENV=production

# Cloud Run injects PORT (default 8080)
ENV PORT=8080

EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
