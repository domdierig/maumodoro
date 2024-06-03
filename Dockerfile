FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY index.html /usr/share/nginx/html
COPY app.js /usr/share/nginx/html
COPY style.css /usr/share/nginx/html

COPY assets/break.mp3 /usr/share/nginx/html
COPY assets/work.mp3 /usr/share/nginx/html

COPY assets/favicon.ico /usr/share/nginx/html

COPY assets/plus.svg /usr/share/nginx/html
COPY assets/check.svg /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]