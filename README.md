# -Simple Car API-

A simple car API that consists of all CRUD operations done on the model 'Car' - [GET], [POST], [PUT], [DELETE].

## App structure

The app is structured with a Backend part done in Django Rest Framework (Python) and a Frontend done in React (JS) with Bootstrap.

![App Structure](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuOfsoKhCIyzN24ejBb5mAqhCJItFByfMq0YeBCd8pzECLT2rKuWEo2ykIIzA3GxqKN1nYYMiHqyFg2aeDJ6vH473AnWeOALGMfpAXH22gN7ApoyfBYbAB80fSKZDIm4w2m00)

## Classes

The database consists of three models:
    
    1. Car (id, VIN, carplate, modelid)
    2. CarModel (id, model, year, carmakeid)
    3. CarMake (id, name)

![Class diagram](https://www.plantuml.com/plantuml/png/SoWkIImgAStDuKhEIImkLd1EB5Aevb9GqFNCAr78J06nWakAClFI5S8y_P1uoOb51Jc99QamfRdvAQavOFL0f0tHhA49OYEqG_Xe1W05QxaGblk2pC7k0eWTIFpArCGYg4AGSRc9sQb0zPZs8pH3HH3QqMq76e73yhp4t5HCin5o49D0mQUhMsC7zueLF6HW8c1vc6LMI0vtICrB0KO40000)

## Updates

Feel free to make pull requests for me to update the simple yet interesting example app! :)