from .test_setup import TestSetup
from ..models import Car, CarMake, CarModel

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
        self.assertEqual(len(CarModel.objects.all()), 3)

    def test_can_post_car(self):
        newCar = {
            'VIN': "0000000003",
            'carplate': "TE0000ST", 
            'modelid': 2
        }
        
        result = self.client.post(self.cars_url, newCar)

        self.assertEqual(result.status_code, 200)
        self.assertEqual(Car.objects.get(VIN = "0000000003").carplate, "TE0000ST")
        self.assertEqual(len(Car.objects.all()), 3)
    
    # [PUT]
    def test_can_update_carmodel(self):
        updatedCarModel = {
            'model': "S200", # Changed model!
            'year': "2010" # Changed year!
        }
        
        result = self.client.put(self.carmodelsid2_url, updatedCarModel)

        self.assertEqual(result.status_code, 200)
        self.assertEqual(CarModel.objects.get(model = "S200").year, "2010")

    def test_can_update_car(self):
        updatedCar = {
            'VIN': "0000000005", # Changed VIN!
            'carplate': "AB1396EB" # Changed carplate!
        }

        result = self.client.put(self.carsid2_url, updatedCar)

        self.assertEqual(result.status_code, 200)
        self.assertEqual(Car.objects.get(VIN = "0000000005").carplate, "AB1396EB")
        self.assertEqual(Car.objects.get(carplate = "AB1396EB").VIN, "0000000005")
    
    # [DELETE]
    def test_can_delete_carmodel(self):
        result = self.client.delete(self.carmodelsid2_url)
        
        self.assertEqual(result.status_code, 200)
        self.assertEqual(len(CarModel.objects.all()), 1)

    def test_can_delete_car(self):
        result = self.client.delete(self.carsid2_url)
        
        self.assertEqual(result.status_code, 200)
        self.assertEqual(len(Car.objects.all()), 1)