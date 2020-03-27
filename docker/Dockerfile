FROM harbor.9itest.com/base/node12-alpine:latest
MAINTAINER CODYY.COM
ENV VERSION 1.0-SNAPSHOT

RUN echo "http://mirrors.aliyun.com/alpine/v3.9/main" > /etc/apk/repositories \
    && echo "http://mirrors.aliyun.com/alpine/v3.9/community" >> /etc/apk/repositories \
    && apk update upgrade \
    && apk add --no-cache unzip bash tzdata busybox-extras gettext nginx \
    &&ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

COPY dist.zip /intractionclass/portal.zip
COPY nginx.conf /etc/nginx/nginx.conf
COPY intractionclass.conf /etc/nginx/conf.d/intractionclass.conf
COPY startup.sh /root/bin/startup.sh

RUN chmod +x /root/bin/startup.sh

RUN unzip /intractionclass/portal.zip -d /intractionclass \
    && rm -rf /intractionclass/portal.zip

CMD ["/root/bin/startup.sh"]
