FROM node:18-alpine
# 在容器内创建工作目录
WORKDIR /lego-backend
# 下载依赖
COPY package.json pnpm-lock.yaml /lego-backend
RUN npm i pnpm -g && pnpm config set registry https://registry.npmmirror.com/
RUN pnpm i
# 构建项目
COPY . /lego-backend
RUN npm run build
EXPOSE 3000
CMD npm run start:prod
