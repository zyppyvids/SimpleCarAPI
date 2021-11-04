from django.db import models
from django.db.models.fields.related import ForeignKey

# Create your models here.

class CarMake(models.Model):
    id = models.AutoField(primary_key = True)
    name = models.CharField(max_length = 10, null = False)
    
    def __str__(self) -> str:
        return f"[{self.name}]"

class CarModel(models.Model):
    id = models.AutoField(primary_key = True)
    model = models.CharField(max_length = 10, null = False)
    year = models.CharField(max_length = 10, null = False)
    carmakeid = models.ForeignKey(CarMake, on_delete = models.CASCADE, related_name = 'carmakeid', null = False)

    def __str__(self) -> str:
        return f"[{self.model}] [{self.year}]"
        

class Car(models.Model):
    id = models.AutoField(primary_key = True)
    VIN = models.CharField(max_length = 10, null = False)
    carplate = models.CharField(max_length = 10, null = False)
    modelid = models.ForeignKey(CarModel, on_delete = models.CASCADE, related_name = 'modelid', null = False)

    def __str__(self) -> str:
        return f"[{self.VIN}] [{self.carplate}]"