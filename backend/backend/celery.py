from celery import Celery
import os
from django.conf import settings
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

app = Celery("callmall")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()