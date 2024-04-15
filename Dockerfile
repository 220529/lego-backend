FROM node:18-alpine
RUN mkdir -p /app/lego-backend
WORKDIR /app/lego-backend
COPY package.json pnpm-lock.yaml /app/lego-backend
RUN npm i pnpm -g && pnpm config set registry https://registry.npmmirror.com/
RUN pnpm i
COPY . /app/lego-backend
RUN npm run build
EXPOSE 3000
CMD npm run start:prod
