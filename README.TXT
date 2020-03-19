Apirestdemo

A demo of an implementation of a restfull api, the server run on nodejs using express router

Features

Nodejs server wraped with express router
Express router whith public and protected routes
Singin with email format validation
Login with email and pasword suport, and token retriving
Token generation via jsonwebtoken
Mongo DB with Mongo atlass cloud service
Implemetation of schemas for a hipotetical user, product and orders managment
Upload images jpg and png with midleware multer diskstorage
Implementation of password encrpyt hash with bcrypt
Imlementation of dev monitoring server with nodemon

Demo routes

request all products

TYPE GET '/products'
Headers
Content-Type application/json

Body: nothing required

return a json payload with the count of products and an array of objects containing each product data fields

create new product
TYPE POST '/products'
Headers: 
Autorization Token

Body:
Form Data
name: string
price: number
File: jpg or png

return a json payload with a message if succesful 

get product by id:

TYPE GET '/products/:productId' 

Headers
Content-Type application/json

params:productId

Body: 
nothing required

return a json payload with the data of product.

Patch product: 

TYPE PATCH '/products/:productId' 

Headers
Content-Type application/json
Autorization : token
params:productId

Body: 
an array whith a key value objects 
[
    { "propName": "name" , "value": "la bola" },
    { "propName": "price" , "value": "50.00" }

]

return a json payload with a message and a request url to see the changes.

Delete products

TYPE DELETE '/products/:productId' 

Headers
Content-Type application/json
Autorization : token
params:productId

Body: 
nothing required

return a json payload with a message and a request url to see all teh list of products.




request all orders

TYPE GET '/orders'
Headers
Content-Type application/json
Autorisation: token

Body: nothing required

return a json payload with the count of orders and an array of objects containing each order data fields

create new order
TYPE POST '/orders'
Headers: 
Autorization Token

Body:
quantity: number
product: string

return a json payload with a message if succesful 

get order by id:

TYPE GET '/orders/:orderId'

Headers
Content-Type application/json
Autorization : token

params:orderId

Body: 
nothing required

return a json payload with the data of the order.



Delete orders

TYPE DELETE '/orders/:orderId' 

Headers
Content-Type application/json
Autorization : token
params:orderId

Body: 
nothing required

return a json payload with a message and a request url to see all teh list of orders.

TYPE POST '/user/singup'
Headers
Content-Type application/json

Body:
email: string
password: string

return a json payload with a message if succes

TYPE POST '/user/login'
Headers
Content-Type application/json

Body:
email: string
password: string

return a json payload with a message if succes and a token

TYPE DELETE 'user/:userId'
Headers
Content-Type application/json
Autorization token
params:userId

Body:
not required

return a json payload with a message if succes
