from .test_setup import TestSetup
from ..models import Car, CarMake, CarModel

class TestModels(TestSetup):
    def test_first_car(self):
        result = Car.objects.get(id = 1)

        self.assertEqual(result.VIN, '000000000')
        self.assertEqual(result.carplate, 'EB1396AB')

    def test_first_carmake(self):
        result = CarMake.objects.get(id = 1)

        self.assertEqual(result.name, 'BMW')
    
    def test_first_carmodel(self):
        result = CarModel.objects.get(id = 1)

        self.assertEqual(result.model, 'X6')
        self.assertEqual(result.year, '2016')
