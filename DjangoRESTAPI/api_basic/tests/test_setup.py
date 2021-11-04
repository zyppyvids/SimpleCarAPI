from rest_framework.test import APITestCase
from django.urls import reverse
from ..models import Car, CarMake, CarModel

class TestSetup(APITestCase):
    
    def setUp(self):
        self.carmodels_url = reverse('carmodels')
        # The args = [1] is the argument given to the url
        self.carmodelsid1_url = reverse('carmodelsid', args = [1])

        # Insert data into testing db
        CarMake.objects.create(
            id = 1, name = 'BMW')
        CarModel.objects.create(
            id = 1, model = 'X6', year = '2016', carmakeid = CarMake.objects.get(name = 'BMW'))
        CarModel.objects.create(
            id = 2, model = 'X3', year = '2010', carmakeid = CarMake.objects.get(name = 'BMW'))
        Car.objects.create(
            id = 1, VIN = '000000000', carplate = 'EB1396AB', modelid = CarModel.objects.get(model = 'X6', year = '2016'))
        Car.objects.create(
            id = 2, VIN = '000000001', carplate = 'EB1396AB', modelid = CarModel.objects.get(model = 'X3', year = '2010'))

        return super().setUp()

    def tearDown(self):
        return super().tearDown()