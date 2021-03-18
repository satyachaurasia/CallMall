from django.db import models
from django.conf import settings

from django.dispatch import receiver

from django.db.models.signals import post_save


# Create your models here.


class PhoneBook(models.Model):
    title = models.CharField(max_length=200)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name='creator_of')
    description = models.TextField(blank = True)



class Contact(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    number = models.CharField(max_length=15)
    phone_books = models.ManyToManyField(PhoneBook, through = 'Membership', related_name='contacts')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name='created_contacts')

    class Meta:
        unique_together = ('creator', 'number')


class Membership(models.Model):
    contact = models.ForeignKey(Contact, on_delete = models.CASCADE)
    phone_book = models.ForeignKey(PhoneBook, on_delete = models.CASCADE)

    class Meta:
        unique_together = ('contact', 'phone_book')


class AutoDialer(models.Model):
    statuses = (
        ("queued", "In Queue"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    )
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name='created_dialers')
    phone_book = models.ForeignKey(PhoneBook, on_delete = models.CASCADE, related_name='dialers')
    name = models.CharField(max_length=200)
    message = models.TextField()
    start_date_time = models.DateTimeField()
    status = models.CharField(max_length=100, choices=statuses, default='queued')

    def __str__(self,):
        return self.name


@receiver(post_save, sender = AutoDialer)
def task_update_handler(sender, instance, created, *args, **kwargs):
    from .tasks import process_dialer
    if created:
        process_dialer.delay(instance.id)
        return
    if instance.status == 'queued':
        process_dialer.delay(instance.id)


class CallRecord(models.Model):
    contact_number =  models.CharField(max_length=15)
    contact_name = models.CharField(max_length=200)
    call_duration = models.IntegerField(blank = True, null=True)
    time_stamp = models.CharField(max_length=200, blank = True)
    price = models.DecimalField(max_digits=14, decimal_places=7, blank = True, null=True)
    auto_dialer = models.ForeignKey(AutoDialer, blank = True, null = True, on_delete = models.SET_NULL)
    sid = models.CharField(max_length=50)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)


