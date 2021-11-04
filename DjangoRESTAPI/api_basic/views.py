from django.shortcuts import render
from rest_framework.views import APIView
from .models import CarModel, Car
from .serializers import CarModelSerializer, CarSerializer
from rest_framework.response import Response
from django.http import Http404

class CarModelAPIView(APIView):
    # Read a single Car
    def get_object(self, pk):
        try:
            return CarModel.objects.get(pk = pk)
        except CarModel.DoesNotExist:
            raise Http404

    def get(self, request, pk = None, format = None):
        if pk:
            data = self.get_object(pk)
            serializer = CarModelSerializer(data)

        else:
            data = CarModel.objects.all()
            serializer = CarModelSerializer(data, many = True)

        return Response(serializer.data)
    
    def post(self, request, format=None):
        data = request.data
        serializer = CarModelSerializer(data = data)

        # Check if the data passed is valid
        serializer.is_valid(raise_exception = True)

        # Create Car in the DB
        serializer.save()

        # Return Response to User
        response = Response()

        response.data = {
            'message': 'Car Model Added Successfully',
            'data': serializer.data
        }

        return response
    
    def put(self, request, pk = None, format = None):
        car_to_update = CarModel.objects.get(pk = pk)

        # Pass the instance to update to the serializer, and the data and also partial to the serializer
        # Passing partial will allow us to update without passing the entire Car object
        serializer = CarModelSerializer(instance = car_to_update, data = request.data, partial = True)

        serializer.is_valid(raise_exception = True)
        serializer.save()

        response = Response()

        response.data = {
            'message': 'Car Model Updated Successfully',
            'data': serializer.data
        }

        return response

    def delete(self, request, pk, format = None):
        car_to_delete = CarModel.objects.get(pk = pk)

        car_to_delete.delete()

        return Response({
            'message': 'Car Model Removed Successfully'
        })

class CarAPIView(APIView):    
    # Read a single Car
    def get_object(self, pk):
        try:
            return Car.objects.get(pk = pk)
        except Car.DoesNotExist:
            raise Http404

    def get(self, request, pk = None, format = None):
        if pk:
            data = self.get_object(pk)
            serializer = CarSerializer(data)

        else:
            data = Car.objects.all()

            # Filtering by query parameters
            id = request.query_params.get('id')
            vin = request.query_params.get('vin')
            carplate = request.query_params.get('carplate')

            if id is not None:
                data = data.filter(id = id)
            if vin is not None:
                # __icontains is used to perform a "contains" filter
                data = data.filter(VIN__icontains = vin)
            if carplate is not None:
                # __icontains is used to perform a "contains" filter
                data = data.filter(carplate__icontains = carplate)
            
            serializer = CarSerializer(data, many = True)

        return Response(serializer.data)
    
    def post(self, request, format=None):
        data = request.data
        serializer = CarSerializer(data = data)

        # Check if the data passed is valid
        serializer.is_valid(raise_exception = True)

        # Create Car in the DB
        serializer.save()

        # Return Response to User
        response = Response()

        response.data = {
            'message': 'Car Added Successfully',
            'data': serializer.data
        }

        return response
    
    def put(self, request, pk = None, format = None):
        car_to_update = Car.objects.get(pk = pk)

        # Pass the instance to update to the serializer, and the data and also partial to the serializer
        # Passing partial will allow us to update without passing the entire Car object
        serializer = CarSerializer(instance = car_to_update, data = request.data, partial = True)

        serializer.is_valid(raise_exception = True)
        serializer.save()

        response = Response()

        response.data = {
            'message': 'Car Updated Successfully',
            'data': serializer.data
        }

        return response

    def delete(self, request, pk, format = None):
        car_to_delete = Car.objects.get(pk = pk)

        car_to_delete.delete()

        return Response({
            'message': 'Car Removed Successfully'
        })

'''

              <tr>
                <td>{this.state.car.id}</td>
                <td>{this.state.car.VIN}</td>
                <td>{this.state.car.carplate}</td>
                <td>{this.state.car.modelid}</td>
              </tr>
'''