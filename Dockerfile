FROM lukaskwkw/pnpm7

WORKDIR /app
COPY server server
COPY web web
COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY .eslintrc .eslintrc
COPY .prettierrc .prettierrc
COPY pnpm-lock.yaml pnpm-lock.yaml
RUN pnpm install && cd web && pnpm install
RUN pnpm build
CMD ["npm", "run", "start-prod"]