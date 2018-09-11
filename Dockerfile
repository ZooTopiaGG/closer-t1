FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs
LABEL MAINTAINER lichong <lichong@umscloud.com>

COPY ./*.conf /etc/nginx/conf.d/

RUN mkdir /apps/closer-t1
COPY ./dist/ /apps/closer-t1
WORKDIR /apps/closer-t1

EXPOSE 3604

