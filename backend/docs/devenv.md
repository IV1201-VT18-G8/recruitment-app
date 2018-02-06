Development Environment
=======================

Initial Setup
-------------

Run from `backend` directory:

    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python3 manage.py migrate

Development Session
-------------------

Run from `backend` directory, in each terminal window you use:

    source venv/bin/activate

Useful commands:

    # Run dev server
    python3 manage.py runserver

    # Run unit tests
    python3 manage.py test

    # Make migrations
    python3 manage.py makemigrations

    # Apply above migrations to database
    python3 manage.py migrate
