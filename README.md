
# Express.js Authentication Backend

This is a simple Express.js backend that illustrates user authentication. It includes endpoints for user registration, login, and a protected default endpoint.

## Endpoints

### Register

- **URL:** `/register/`
- **Method:** `POST`
- **Description:** This endpoint takes user data in the format of `username`, `email`, and `password` and creates a user in MongoDB using Mongoose.
  
#### Payload
```json

  "username": "exampleUser",
  "email": "example@example.com",
  "password": "examplePassword"
```



### Login

- **URL:** `/login/`
- **Method:** `POST`
- **Description:** This endpoint takes  the user `email`, and `password` and creates a jwt access token which is returned to the user.
  
#### Payload
```json
  "email": "example@example.com",
  "password": "examplePassword"
```


### Index

- **URL:** `/`
- **Method:** `GET`
- **Description:** This endpoint takes  checks if the user is authenticated or not based on the access token passed to the authorization header and returns "Unauthorised user" if no valid token is provided and returns "User is authenticated if a valid access token is passed .
  






