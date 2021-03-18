from django.conf import settings
from re import findall, sub

from twilio.rest import Client

client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

class SendVoiceMessageFromTemplate:
    def __init__(self, template, to, context_dict):
        self.content = self.get_template_with_context(template, context_dict)
        self.to = to

    def send_voice(self,):
        print("sending voice with", self.content)
        call = client.calls.create(status_callback='http://7d199cf46972.ngrok.io/api/core/twilio-web-hook/',
                                status_callback_event=['completed'],
                                status_callback_method='POST',
                                twiml= f"<Response><Say>{self.content}</Say></Response>", 
                                to=self.to, from_=settings.TWILIO_PHONE_NO)
        return call
    
    def get_template_with_context(self, template, context_dict):
        param_names = self.get_param_names_from_template(template)

        content = template
        for param_name in param_names:
            param_value = self.get_param_value(param_name, context_dict)
            if param_value:
                print("substituting", param_name, "with", param_value)
                content = sub(r"\#" + param_name, param_value, content)
        return content
    
    def get_param_names_from_template(self, template):
        return findall(r"\#([a-zA-Z]+)", template)

    def get_param_value(self, parameter, context_dict):
        return context_dict.get(str(parameter), None)
    

