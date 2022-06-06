FROM nospy/pnpm:18-alpine

WORKDIR /app
COPY build build
COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm install -P
CMD ["node", "build/index.js"]