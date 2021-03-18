from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import generics, status, viewsets, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from .serializers import UserSerializer, LoginSerializer, PhoneBookSerializer, ContactSerializer, AutoDialerSerializer, \
    CallRecordSerializer

from .models import Contact, PhoneBook, Membership, AutoDialer, CallRecord

from .permissions import IsOwner

from .tasks import process_dialer


@api_view(('GET',))
@permission_classes([IsAuthenticated,])
def get_call_records(request):
    call_records = CallRecord.objects.filter(creator = request.user)
    return Response(CallRecordSerializer(call_records, many=True).data, status = status.HTTP_200_OK)
    



@api_view(('POST',))
@permission_classes([AllowAny,])
def twilio_web_hook(request):
    call_sid = request.data.get('CallSid', None)
    if call_sid:
        try:
            call_record = CallRecord.objects.get(sid = call_sid)
        except Exception as e:
            print(e)
            return Response(status = status.HTTP_200_OK)
        
        time_stamp = request.data.get('Timestamp', None)
        call_duration = request.data.get('CallDuration', None)

        if time_stamp:
            call_record.time_stamp = time_stamp
        if call_duration:
            call_record.call_duration = call_duration
        call_record.save()
    
    return Response(status = status.HTTP_200_OK)



class AutoDialerViewSet(viewsets.ModelViewSet):
    """
        AutoDialer Model API End Point
    """
    serializer_class = AutoDialerSerializer
    queryset = AutoDialer.objects.all()
    permission_classes = (IsAuthenticated,IsOwner)

    def list(self, request):
        queryset = AutoDialer.objects.filter(creator = request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def perform_create(self, serializer):
        if self.request.user != serializer.validated_data['phone_book'].creator:
            raise serializers.ValidationError("Not Allowed")
        serializer.save()


class ContactViewSet(viewsets.ModelViewSet):
    """
        Contact Model API End Point
    """
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = (IsAuthenticated,IsOwner)

    def list(self, request):
        queryset = Contact.objects.filter(creator = request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)



class PhoneBookViewSet(viewsets.ModelViewSet):
    """
        PhoneBook Model API End Point
    """
    serializer_class = PhoneBookSerializer
    queryset = PhoneBook.objects.all()
    permission_classes = (IsAuthenticated,IsOwner)

    def list(self, request):
        queryset = PhoneBook.objects.filter(creator = request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    

class UserCreateAPIView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        headers = self.get_success_headers(serializer.data)
        return Response({'token': token.key,'user': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)



@api_view(('POST',))
def CustomAuthToken(request):
	serializer = LoginSerializer(data=request.data)
	serializer.is_valid(raise_exception=True)
	user = serializer.validated_data
	token, created = Token.objects.get_or_create(user=user)
	return Response({'token': token.key,'user': UserSerializer(user).data}, status = status.HTTP_200_OK)

