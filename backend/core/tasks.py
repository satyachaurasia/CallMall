from celery.decorators import task
from .models import AutoDialer, CallRecord
from django.utils import timezone
from .utils import SendVoiceMessageFromTemplate


@task
def process_dialer(auto_dialer_id):
    print(auto_dialer_id)
    try:
        dialer = AutoDialer.objects.select_related('phone_book').get(id = auto_dialer_id)
    except Exception as e:
        print(e)
        return
    
    if dialer.status == 'completed' or dialer.status == 'in_progress':
        return
    
    if dialer.start_date_time > timezone.now():
        print(dialer.start_date_time)
        process_dialer.apply_async((dialer.id,), eta=dialer.start_date_time)
        return

    print("Started Processing: ", dialer)
    dialer.status = 'in_progress'
    dialer.save()
    for contact in dialer.phone_book.contacts.all():
        context_dict = {
            'firstName':contact.first_name,
            'lastName': contact.last_name,
            'city': contact.city
        }
        obj = SendVoiceMessageFromTemplate(dialer.message, contact.number,context_dict)
        call_detail = obj.send_voice()
        try:
            CallRecord.objects.create(contact_number = contact.number,
                                    contact_name = f"{contact.first_name} {contact.last_name}",
                                    auto_dialer =dialer,
                                    sid = call_detail.sid,
                                    creator = dialer.creator )
        except Exception as e:
            print(e)



    dialer.status = 'completed'
    dialer.save()
