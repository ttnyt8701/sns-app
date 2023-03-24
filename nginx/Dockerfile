FROM nginx:latest

#viが使えなかったのでインストール
RUN apt-get update && apt-get install -y vim

COPY nginx.conf /etc/nginx/conf.d/default.conf
