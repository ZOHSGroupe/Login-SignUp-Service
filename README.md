
## Description

Auth-Service is an Application Programming Interface (API) to handle Login and Signup process.
## Installation :
```bash
# install requirements
$ npm install
```
## Running the app : 
```bash
# Run application
$ npm start
```
## Build Docker image : 
```bash
# build a docker image
$ docker build -t signin-up-service .
```
## Running the app in the Docker : 
```bash
# Run docker image
$ docker run -p 5000:5000 signin-up-service
```
## Running with Docker compose :
```bash
# Run docker compose
$ docker compose up
```

## Available Endpoints

### 1. Signup

- **Endpoint:** `/auth/signup`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**
  - `id_sql: String` - The user's ID.
  - `email: String` - The user's email address.
  - `username: String` - The user's role.
  - `nationalId: String` - The user's national ID.
  - `password: String` - The user's password.
- **Response:**
  - `200`: User successfully registered.
  - `400`: Bad Request - Missing required fields in the request body.
  - `500`: Internal Server Error.

### 2. Signin

- **Endpoint:** `/auth/signin`
- **Method:** POST
- **Description:** Authenticate and obtain a JWT token.
- **Request Body:**
  - `email: String` - The user's email address.
  - `password: String` - The user's password.
- **Response:**
  - `200`: Successful signin with JWT token.
  - `400`: Bad Request - Missing required fields in the request body.
  - `401`: Unauthorized - Invalid Password or User Not found.
  - `500`: Internal Server Error.

### 3. Change Password

- **Endpoint:** `/auth/change-password`
- **Method:** POST
- **Description:** Change the user's password.
- **Request Body:**
  - `email: String` - The user's email address.
  - `oldPassword: String` - The user's current password.
  - `newPassword: String` - The user's new password.
- **Response:**
  - `200`: Password changed successfully.
  - `400`: Bad Request - Missing required fields in the request body.
  - `401`: Unauthorized - Invalid Old Password or User Not found.
  - `500`: Internal Server Error.

## Configuration

Ensure to set the following environment variables:

- `SECRET_CRYPTO`: Secret key for encrypting and decrypting user ID.
- `SECRET_JWT`: Secret key for JWT token generation and verification.



## Stay in touch :
- Author - [Ouail Laamiri](https://www.linkedin.com/in/ouaillaamiri/)
- Test - [Postman](https://www.postman.com/avionics-meteorologist-32935362/workspace/postman-api-fundamentals-student-expert/collection/29141176-8abc7d24-d6b7-4b89-a56e-4e4a6e5c7a5a?action=share&creator=29141176)
- Documentation - [Postman](https://documenter.getpostman.com/view/29141176/2s9Ykt5et6)

## License

Auth-Service is [GPL licensed](LICENSE).