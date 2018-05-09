# 17: Bearer Authentication

This application uses MongoDB to POST and GETnew users/accounts/profiles

## Account Model

Requires a user name, email, and password for each new user instance

## Profile Model

Takes in a first and last name, a bio, avatar, favorite color, location, and a required connection to an account schema.

## Account Routes

`authRouter.post('/signup', jsonParser, (request, response, next))`: Creates a new user account and posts it to our database. Once created, the password is replaced with a hashed password and a token is created for the user. Possible responses to this include:

- 200 for a successful post.
- 400 if a bad request
- 409 if any of the existing unique keys are replicated in the post

ID is randomly assigned to each instance by the mongoose middleware.

`authRouter.get('/login', basicAuthMiddleware, (request, response, next))`: Allows a user to receive their profile with the use of a token which was generated upon logging in or signing up. Possible responses include:

- 200 for a successful get.
- 400 for a bad request.

## Profile Routes

`profileRouter.post('/profiles', bearerAuthMiddleware, jsonParser, (request, response, next))`: Allows a new profile instance to be posted which provides the request.body of the new profile. Possible responses include: 

- 200 for a successful post
- 400 for an invalid request

