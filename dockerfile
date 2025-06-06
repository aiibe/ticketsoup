# --- Build Stage ---
FROM node:slim AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the code and build
COPY . .
RUN pnpm build

# --- PocketBase Download Stage ---
FROM alpine:latest AS pb_downloader

ARG PB_VERSION=0.28.2

RUN apk add --no-cache unzip curl && \
    curl -L -o /tmp/pb.zip https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip && \
    unzip /tmp/pb.zip -d /pb && \
    chmod +x /pb/pocketbase

# --- Production Stage ---
FROM alpine:latest

WORKDIR /

# Copy PocketBase binary
COPY --from=pb_downloader /pb/pocketbase /pocketbase

# Copy built frontend
COPY --from=builder /app/dist /pb_public

# Copy PocketBase extras
COPY ./pb/pb_migrations /pb_migrations
COPY ./pb/pb_hooks /pb_hooks

EXPOSE 8090

# Copy entry script
COPY docker-entry.sh /docker-entry.sh
RUN chmod +x /docker-entry.sh

ENTRYPOINT ["/docker-entry.sh"]
