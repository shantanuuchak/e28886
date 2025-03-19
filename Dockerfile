FROM oven/bun:1

WORKDIR /app
COPY . .

# Install Python and build tools for node-gyp
RUN apt-get update && apt-get install -y python3 build-essential

RUN bun install

# Rebuild better-sqlite3 to ensure compatibility
RUN bun rebuild better-sqlite3

ARG PORT
EXPOSE ${PORT:-8000}

CMD ["bun", "server.ts"]