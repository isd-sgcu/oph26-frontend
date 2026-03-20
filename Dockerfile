# Build stage
FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# VITE_PUBLIC_* vars are baked into the JS bundle at build time
ENV VITE_PUBLIC_API_URL=https://dev-api.cuoph2026.com/api
ENV VITE_PUBLIC_GOOGLE_CLIENT_ID=842847694264-imd7rs1n1lo1i00f3vptn4a46gia2p40.apps.googleusercontent.com
ENV VITE_PUBLIC_GOOGLE_PROJECT_ID=test-oph-26
ENV VITE_PUBLIC_GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
ENV VITE_PUBLIC_GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
ENV VITE_PUBLIC_GOOGLE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs

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
