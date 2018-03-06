FROM ubuntu:latest

# Install packages
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN pip3 install --upgrade pip
RUN apt-get install -y python3-psycopg2
RUN apt-get install -y nginx
RUN apt-get -y install gettext
ADD ./requirements/ /recruitmentapp/requirements/
RUN pip3 install -r /recruitmentapp/requirements/base.txt
RUN pip3 install -r /recruitmentapp/requirements/production.txt

# Set timezone
ENV TZ=Europe/Stockholm
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Placeholder env vars
# These are to be specified when running the container
ENV DJANGO_SECRET_KEY=secret \
    DJANGO_HOST_NAME=djangohostname \
    DJANGO_CORS_HOST_NAME=djangocorshostname \
    PSQL_NAME=pgdb \
    PSQL_USER=pgusr \
    PSQL_PASSWORD=pgpw \
    DB_HOST=pgpw

# Set environment vars
ENV PYTHONPATH=/recruitmentapp/ \
    DJANGO_SETTINGS_MODULE=recruitmentapp.settings.production

# Copy files and setup
ADD ./recruitmentapp/ /recruitmentapp/recruitmentapp/
ADD ./manage.py /recruitmentapp/
ADD ./Makefile /recruitmentapp/
ADD ./locale /recruitmentapp/locale/
WORKDIR /recruitmentapp/
RUN python3 manage.py collectstatic --noinput
RUN django-admin compilemessages
ADD ./deployment /recruitmentapp/deployment/
RUN rm /etc/nginx/sites-enabled/default \
    && cp /recruitmentapp/deployment/nginx/nginx.conf /etc/nginx/nginx.conf \
    && cp /recruitmentapp/deployment/nginx/recruitmentapp /etc/nginx/sites-available/recruitmentapp \
    && ln -s /etc/nginx/sites-available/recruitmentapp /etc/nginx/sites-enabled/recruitmentapp
CMD service nginx start && gunicorn -c /recruitmentapp/deployment/gunicorn/gunicorn_config.py recruitmentapp.wsgi

EXPOSE 80 443
