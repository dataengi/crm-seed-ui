FROM nginx:1.13.3-alpine

COPY docker/prod/nginx/default.nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY dist /usr/share/nginx/html

COPY docs /usr/share/nginx/html/docs

CMD ["nginx", "-g", "daemon off;"]
