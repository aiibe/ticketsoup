# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copy the app code
COPY . .

# Build the project
RUN yarn run build

# Download and unzip PocketBase
ARG PB_VERSION=0.26.6
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN mkdir -p /pb && unzip /tmp/pb.zip -d /pb && chmod +x /pb/pocketbase

# Production Stage
FROM scratch

WORKDIR /

# Copy PocketBase and assets
COPY --from=builder /pb/pocketbase /pocketbase
COPY --from=builder /app/dist /pb_public

COPY ./pb/pb_migrations /pb_migrations
COPY ./pb/pb_hooks /pb_hooks

EXPOSE 8090

CMD ["/pocketbase", "serve", "--http=0.0.0.0:8090"]
