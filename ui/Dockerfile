FROM nginx:1.16.1 AS client-browser
COPY /www /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
