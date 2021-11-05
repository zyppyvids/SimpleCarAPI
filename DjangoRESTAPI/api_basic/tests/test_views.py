from .test_setup import TestSetup
from ..models import Car, CarMake, CarModel
import json

class TestViews(TestSetup):
    # [GET]
    def test_can_get_all_carmodels(self):
        result = self.client.get(self.carmodels_url)

        self.assertEqual(result.status_code, 200)

    def test_can_get_single_carmodel(self):
        result = self.client.get(self.carmodelsid2_url)
        
        self.assertEqual(result.status_code, 200)

    def test_can_get_all_cars(self):
        result = self.client.get(self.cars_url)

        self.assertEqual(result.status_code, 200)

    def test_can_get_single_car(self):
        result = self.client.get(self.carsid2_url)
        
        self.assertEqual(result.status_code, 200)
    
    # [POST]
    def test_can_post_carmodel(self):
        newCarModel = {
            'model': "S500",
            'year': "2008", 
            'carmakeid': 2
        }
        
        result = self.client.post(self.carmodels_url, newCarModel)

        self.assertEqual(result.status_code, 200)
        self.assertEqual(CarModel.objects.get(model = "S500").year, "2008")

    def test_can_post_car(self):
        newCar = {
            'VIN': "000000003",
            'carplate': "TE0000ST", 
            'modelid': 2
        }
        
        result = self.client.post(self.cars_url, newCar)

        self.assertEqual(result.status_code, 200)
        self.assertEqual(Car.objects.get(VIN = "000000003").carplate, "TE0000ST")
# TODO: Add tests for all views