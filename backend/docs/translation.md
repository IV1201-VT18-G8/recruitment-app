Translation
-----------

Generate new message files (.po) with (from project root dir)::

    django-admin makemessages --locale=sv --locale fi --ignore=venv* --pythonpath="." --settings="recruitmentapp.settings.development"

Compile the message files with::

    django-admin compilemessages
