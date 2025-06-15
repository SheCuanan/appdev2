# Simple Book API

This is a RESTful API for managing books. It is built using Node.js, Express, and MongoDB Atlas.

## Deployment

The API is deployed on Render and can be accessed at:

https://appdev2-bmff.onrender.com

## What Can Be Done

- User registration and login with JWT authentication
- CRUD operations for books
- Email notifications using Nodemailer
- Password hashing using bcrypt
- Data seeding with Faker
- Cloud database using MongoDB Atlas

## How to Use

### Base URL
https://appdev2-bmff.onrender.com

### Auth Endpoints

- `POST /auth/signup` – Register a new user
- `POST /auth/signin` – Log in and get a JWT token

### Book Endpoints (Require JWT)

- `GET /books` – Get all books
- `POST /books` – Create a new book
- `GET /books/:id` – Get book by ID
- `PUT /books/:id` – Update book
- `DELETE /books/:id` – Delete book

### Authorization

For routes that require authentication, add this header:

Authorization: Bearer <your_token>

## Environment Variables

These are required and should be configured in Render:

- `MONGO_URI` – MongoDB Atlas connection string
- `JWT_SECRET` – Secret key for JWT
- `EMAIL_USER` – Email used for sending messages 
- `EMAIL_PASS` – Password or app password for email

*Note: You can use any email provider (Gmail,
Mailtrap,
Ethereal,
Outlook, etc.
)*

## Testing

Use Postman or similar tools to test all routes. Make sure the deployed API responds correctly and reflects changes in MongoDB Atlas.
