from django.urls import path
from .views import CarModelAPIView, CarAPIView

urlpatterns = [
    path('carmodels', CarModelAPIView.as_view(), name = 'carmodels'),
    path('carmodels/<str:pk>', CarModelAPIView.as_view(), name = 'carmodelsid'), # str:pk is the primary key by which we search for a given car model
    path('cars', CarAPIView.as_view(), name = 'cars'),
    path('cars/<str:pk>', CarAPIView.as_view(), name = 'carsid') # str:pk is the primary key by which we search for a given car
]

