FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

COPY index.html /usr/share/nginx/html
COPY app.js /usr/share/nginx/html
COPY style.css /usr/share/nginx/html
COPY break.mp3 /usr/share/nginx/html
COPY work.mp3 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]