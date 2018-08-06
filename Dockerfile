FROM harbor.tiejin.cn/closer/umscloud-nginx-nodejs
MAINTAINER lichong <lichong@umscloud.com>

COPY ./*.conf /etc/nginx/conf.d/

RUN mkdir /apps/closer-h5-new
COPY ./dist/ /apps/closer-h5-new
WORKDIR /apps/closer-h5-new

EXPOSE 3604
