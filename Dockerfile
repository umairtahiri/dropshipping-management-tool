FROM node:16
WORKDIR /app

# Setup pnpm package manager
RUN npm install -g pnpm@6.32.14

# Setup proxy to API used in saleor-platform
RUN apt-get update && apt-get install -y nginx
COPY ./nginx/dev.conf /etc/nginx/conf.d/default.conf

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .
ARG API_URI
ENV API_URI ${API_URI:-http://localhost:8000/graphql/}
RUN pnpm build

EXPOSE 3001
CMD pnpm start -- --hostname 0.0.0.0 -p 3001
