FROM node:12-alpine

LABEL maintainer=brian@toimc.com

# 创建一个工作目录
WORKDIR /app

COPY . .

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && apk update


RUN apk --no-cache add --virtual builds-deps build-base python alpine-sdk \
  && apk add --upgrade --no-cache vips-dev --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community/ \
  && npm config set sharp_binary_host "https://npm.taobao.org/mirrors/sharp" \
  && npm config set sharp_libvips_binary_host "https://npm.taobao.org/mirrors/sharp-libvips" \
  # && npm install sharp --no-progress --registry=https://registry.npm.taobao.org \
  # && npm install --no-progress --registry=https://registry.npm.taobao.org \
  # && cnpm install node-pre-gyp \
  && yarn install --no-progress --registry=https://registry.npm.taobao.org \
  && npm run build \
  && npm rebuild bcrypt --build-from-source \
  && apk del builds-deps

EXPOSE 3000 3001

VOLUME [ "/app/ public" ]

CMD [ "node", "dist/server.bundle.js" ]