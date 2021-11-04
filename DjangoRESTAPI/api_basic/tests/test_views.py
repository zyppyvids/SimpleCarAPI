from .test_setup import TestSetup

class TestViews(TestSetup):
    def test_can_get_all_cars(self):
        result = self.client.get(self.carmodels_url)

        self.assertEqual(result.status_code, 200)

    def test_can_get_single_car(self):
        result = self.client.get(self.carmodelsid1_url)
        
        self.assertEqual(result.status_code, 200)

# TODO: Add tests for all views