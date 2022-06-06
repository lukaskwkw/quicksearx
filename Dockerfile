FROM nospy/pnpm:18-alpine

WORKDIR /app
COPY server server
COPY web web
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY .eslintrc .eslintrc
COPY .prettierrc .prettierrc
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm install && cd web && pnpm install
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN pnpm build
CMD ["node", "build/index.js"]