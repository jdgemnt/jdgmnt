FROM nginx:1.16.1 AS client-browser
COPY /dist/j-dgmnt /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
