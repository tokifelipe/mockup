FROM node:22-bookworm-slim

WORKDIR /app

# pnpm
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

# instala solo con lockfile de pnpm
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# resto del código
COPY . .

EXPOSE 3000
CMD ["pnpm","run","dev"]
