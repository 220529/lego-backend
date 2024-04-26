FROM node:18-alpine
# 在容器内创建工作目录
WORKDIR /lego-backend
# 下载依赖
COPY package.json package-lock.json /lego-backend
RUN npm i
# 构建项目
COPY . /lego-backend
RUN npm run build
EXPOSE 3302
CMD npm run start:prod