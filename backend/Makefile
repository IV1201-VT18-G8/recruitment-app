lint:
	pycodestyle recruitmentapp/ --exclude=migrations

test: lint
	python3 $(CURDIR)/manage.py test

make production-update:
	python3 $(CURDIR)/manage.py migrate

make production-setup: production-update
	python3 $(CURDIR)/manage.py shell -c "from recruitmentapp.apps.core.models import User; user=User.objects.create_superuser(username='admin', email='admin@example.com', password='admin')"
