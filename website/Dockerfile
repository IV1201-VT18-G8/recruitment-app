FROM nginx:latest

COPY ./deployment/ssl /etc/ssl/certs
COPY ./public /usr/share/nginx/html
COPY ./deployment/nginx/default.conf /etc/nginx/conf.d/
COPY ./deployment/nginx/nginx.conf /etc/nginx/

EXPOSE 80 443
