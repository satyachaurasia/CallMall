from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CustomAuthToken, UserCreateAPIView, PhoneBookViewSet, ContactViewSet, AutoDialerViewSet, \
    twilio_web_hook, get_call_records

app_name = "core"

router = DefaultRouter()

router.register('phone-book', PhoneBookViewSet, basename='phone_book')
router.register('contact', ContactViewSet, basename='contact')
router.register('dialer', AutoDialerViewSet, basename='dialer')


urlpatterns = [
	path('login-token/', CustomAuthToken, name="login_token"),
    path('signup/', UserCreateAPIView.as_view(), name="signup"),
    path('twilio-web-hook/', twilio_web_hook, name="twilio_web_hook"),
    path('call-records/', get_call_records, name="call_records"),
]

urlpatterns += router.urls
