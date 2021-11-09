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

    def validate(self, data):
        errors = {}
        carVIN = data.get('VIN')
        carplate = data.get('carplate')
        
        if len(carVIN) != 10:
            errors['error'] = u'VIN should be 10 characters long.'
            raise serializers.ValidationError(errors)
        if len(carplate) != 8:
            errors['error'] = u'Car\'s plate should be 8 characters long.'
            raise serializers.ValidationError(errors)
            
        return data