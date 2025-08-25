FROM nginx:1.29-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html
