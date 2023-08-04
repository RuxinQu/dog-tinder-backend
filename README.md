# Dog Tinder Backend

## Description

This is the server-side application that powers "[Dog TInder](https://dog-tinder-rq.netlify.app)". It handles user authentication, dog profiles, and matchmaking for our canine companions. You can access the client-side repo [here](https://github.com/RuxinQu/dog-tinder).

## Table of Contents

- [Getting Started](#getting-started)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To run the Dog Tinder Backend on your local machine, follow these steps:

1. Clone this repository to your local machine using `git clone https://github.com/RuxinQu/dog-tinder-backend.git`.
2. Install the required dependencies using `npm install`.
3. Set up configuration for MongoDB and AWS in the .env file (see .env.example for reference).
4. Run the application using `npm start` or run the development server using `npm run server`.
5. The backend will be available at http://localhost:3001.
6. Please note that this is a backend application, and it is intended to be accessed via the frontend app or API calls.

## Endpoints

The Dog Tinder Backend provides the following API endpoints:

### User Endpoint

- POST `/user/register`: Sign up a new user with email and password
- POST `/user/login`: Log in an existing user with email and password.
- GET `/user/all`: Fetch all dog profiles.
- GET `/user/one/:id`: Retrieves a specific user based on the provided user ID.
- POST `/user/upload-imgs`: Uploads profile images for a user.
- DELETE `/user/delete-img/:key/user/:userId/img/:imgId`: Removes a specific profile image for a user.
- PUT `/user/add-match`: Adds a match (relationship) between two users.
- PUT `/user/profile/:id`: Updates the profile information for a specific user.

### Message Endpoint

- POST `/user/add-message`: Adds a new message to the database.
- GET `/user/one`: Retrieves messages between two specific users.

## Authentication

To access certain endpoints, such as creating or updating a dog profile, users need to sign up and log in. The backend uses JWT (JSON Web Tokens) for user authentication. Upon successful login, the server provides an access token that should be included in the headers of subsequent requests as Authorization: Bearer YOUR_ACCESS_TOKEN.

## Error Handling

The backend handles various errors and provides informative error messages in the responses.

## Tech Stack

The Dog Tinder Backend is built using the following technologies:

- Node.js
- Express.js
- MongoDB (MongoDB Atlas for cloud deployment)
- JSON Web Tokens (JWT) for authentication
- Multer
- AWS S3

## Contributing

If you find a bug, have a feature request, or want to submit improvements, feel free to open an issue or create a pull request. Or you can contact me at ruxinqu@gmail.com

## License

This project is licensed under the MIT License.
