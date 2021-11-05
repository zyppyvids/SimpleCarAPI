from rest_framework.test import APITestCase
from django.urls import reverse
from ..models import Car, CarMake, CarModel

class TestSetup(APITestCase):
    
    def setUp(self):
        self.carmodels_url = reverse('carmodels')
        # The args = [1] is the argument given to the url
        self.carmodelsid2_url = reverse('carmodelsid', args = [2])
        self.cars_url = reverse('cars')
        self.carsid2_url = reverse('carsid', args = [2])

        # Insert data into testing db
        CarMake.objects.get_or_create(
            id = 1, name = 'BMW')
        CarMake.objects.get_or_create(
            id = 2, name = 'Merc Benz')
        CarModel.objects.get_or_create(
            id = 2, model = 'X6', year = '2016', carmakeid = CarMake.objects.get(name = 'BMW'))
        CarModel.objects.get_or_create(
            id = 3, model = 'X3', year = '2010', carmakeid = CarMake.objects.get(name = 'BMW'))
        Car.objects.get_or_create(
            id = 2, VIN = '000000000', carplate = 'EB1396AB', modelid = CarModel.objects.get(model = 'X6', year = '2016'))
        Car.objects.get_or_create(
            id = 3, VIN = '000000001', carplate = 'EB1396AB', modelid = CarModel.objects.get(model = 'X3', year = '2010'))

        return super().setUp()

    def tearDown(self):
        return super().tearDown()