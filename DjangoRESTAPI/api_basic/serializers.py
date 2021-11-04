from rest_framework import serializers
from .models import CarMake, CarModel, Car

class CarMakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarMake
        fields = "__all__"

class CarModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarModel
        fields = "__all__"

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"