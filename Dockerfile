# syntax=docker/dockerfile:1

ARG NODE_VERSION=24
ARG CADDY_VERSION=2

# Build the static site
FROM node:${NODE_VERSION}-slim AS build

WORKDIR /app

# Use the pnpm version pinned in package.json#packageManager
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN npm install --global corepack@latest && corepack enable

# Install dependencies first so they are cached between source changes
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build


# Serve the static output with Caddy
FROM caddy:${CADDY_VERSION}-alpine

COPY Caddyfile /etc/caddy/Caddyfile
RUN caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile

COPY --from=build /app/dist /srv

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
