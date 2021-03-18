from django.contrib.auth import get_user_model, authenticate
from rest_framework import serializers

from .models import Contact, PhoneBook, Membership, AutoDialer, CallRecord



class CallRecordSerializer(serializers.ModelSerializer):
    dialer_name = serializers.SerializerMethodField()

    def get_dialer_name(self,obj):
        if obj.auto_dialer:
            return obj.auto_dialer.name
        return ''

    class Meta:
        model = CallRecord
        exclude = ('sid', 'creator', 'auto_dialer')



class AutoDialerSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    phone_book_name = serializers.SerializerMethodField()

    def get_phone_book_name(self,obj):
        return obj.phone_book.title
    class Meta:
        model = AutoDialer
        fields = '__all__'





class ContactSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    phone_books = serializers.PrimaryKeyRelatedField(queryset = PhoneBook.objects.all(), many=True)
    class Meta:
        model = Contact
        fields = '__all__'



class PhoneBookSerializer(serializers.ModelSerializer):
    creator = serializers.HiddenField(default=serializers.CurrentUserDefault())
    contacts = serializers.SerializerMethodField()
    
    def get_contacts(self, obj):
        return ContactSerializer(obj.contacts.all(), many = True).data
    class Meta:
        model = PhoneBook
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, validated_data):
        user = authenticate(**validated_data)
        if user:
            return user

        raise serializers.ValidationError("Incorrect Credentials")



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = get_user_model()
        fields=['username', 'first_name', 'last_name', 'email', 'password']
    
    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user
    