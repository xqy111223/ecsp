#!/usr/bin/env bash

envsubst '${API_SERVER_01} ${API_SERVER_02} ${PORTAL_SERVER_PORT}' < /etc/nginx/conf.d/intractionclass.conf > /etc/nginx/conf.d/intractionclass.conf_01
cp /etc/nginx/conf.d/intractionclass.conf_01 /etc/nginx/conf.d/intractionclass.conf
#tail -f /dev/null
nginx -g "daemon off;"
