FROM ubuntu:15.04

MAINTAINER Kairat Yussupov

RUN apt-get install nano

ADD /dist /dist

RUN apt-get install nginx -y

RUN rm /etc/nginx/nginx.conf

ADD nginx.conf /etc/nginx/

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 9090

CMD service nginx restart
