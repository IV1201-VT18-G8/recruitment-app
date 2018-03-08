Deployment of Backend Server
============================

Deployment of the back end is done using Docker, with one container for
the PostgreSQL database and another for the Django application.
Additionally, the contents of the database are stored on a separate
docker volume. This document assumes that both Docker and Docker
Compose are installed on the development machine and the production
server.

On the Development Machine
--------------------------

The building and configuration of the containers are handled with
Docker Compose. Copy `production-sample.yml` and edit it to suit the
production environment. In this document, we assume that you name the
file `production.yml`.

In `deployment/nginx/reruitmentapp`, set `server_name` (2 occurrences)
to the domain name of your production server. Also check or remove the
HTTPS port number on the HTTP redirect statement (line 4, at the time
of writing).

Place your SSL certificate and private key in `deployment/ssl/`, in
files named `recruitmentapp.crt` and `recruitmentapp.key`, respectively.

For testing purposes there is a script `generate_snakeoil.sh` in said
directory, that generates a self-signed certificate and key.

Build the image.

    docker-compose -p recruitmentapp -f production.yml build

Save the image in a `.tar` file.

    docker save -o recruitmentapp-django-img-<version>.tar recruitmentapp_django

Move the newly created `.tar` file and `production.yaml` over to the
production server.

On the Production Server
------------------------

Load the image from the `.tar` file.

    docker load -i recruitmentapp-django-img-<version>.tar

Start the container.

    docker-compose -p recruitmentapp -f production.yml up -d --no-build

### First Time Install

This will setup the database and create a superuser "admin" with the
password "admin". **Remember to change the password!**

    docker-compose -p recruitmentapp -f production.yml exec django make production-setup

### New Django Container, Update Existing Database

This performs a database migration. There is no way to undo this apart
from restoring the database storage volume from a backup.

    docker-compose -p recruitmentapp -f production.yml exec django make production-update

### Run Tests

    docker-compose -p recruitmentapp -f production.yml exec django make test

Commands to Use in Development
------------------------------

Build:

    docker-compose -p recruitmentapp -f production-sample.yml build

Save image:

    docker save -o recruitmentapp-django-img-<version>.tar recruitmentapp_django

Load image:

    docker load -i recruitmentapp-django-img-<version>.tar

Run composition:

    docker-compose -p recruitmentapp -f production-sample.yml up -d --no-build

Run setup script (for new install):

    docker-compose -p recruitmentapp -f production-sample.yml exec django make production-setup

Run tests (and linting):

    docker-compose -p recruitmentapp -f production-sample.yml exec django make test

Get logs:

    docker cp recruitmentapp_django:/var/log/nginx/access_django.log access_django.log && docker cp recruitmentapp_django:/var/log/nginx/error_django.log error_django.log
