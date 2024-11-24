# install and build
FROM node:lts AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# caddy server
FROM caddy:alpine AS runner
WORKDIR /app
COPY --from=builder /dist /srv
COPY Caddyfile /etc/caddy/Caddyfile
RUN caddy fmt --overwrite /etc/caddy/Caddyfile
CMD caddy run --config /etc/caddy/Caddyfile --adapter caddyfile 2>&1
