################################################################################
# BASE
# This is the stage that the other stages in this file are based on.
# - defines the Node version
# - set global configuration
# - set default work dir
################################################################################
FROM node:20.10-alpine as base

RUN apk add --update --no-cache git python3 make g++

RUN corepack enable && corepack prepare pnpm@8 --activate

# Create app directory
WORKDIR /workspace

# Create the builder
FROM base as build

# Copy package.json and the lock file
COPY package.json pnpm-lock.yaml /workspace/

# Install app dependencies
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile

# Copy source files
COPY . .

# Build apps
RUN pnpm build

# Copy prisma
COPY prisma /workspace/dist/apps/api/prisma

# Move to the dist directory
WORKDIR /workspace/dist/apps/api

# Install app dependencies
RUN pnpm install --frozen-lockfile --prefer-frozen-lockfile --prod

# Generate prisma client
RUN pnpm prisma generate


# Build the final image
FROM base as final

COPY --from=build /workspace/dist/apps /workspace

# Move to the app directory
WORKDIR /workspace/api

# Expose default port
EXPOSE 3000

# Start server
CMD pnpm prestart && pnpm start
