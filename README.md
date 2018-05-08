# 14: Basic Authentication

This application uses MongoDB to POST new users/accounts

## Account Model

Requires a user name, email, and password for each new user instance

## Account Routes

`authRouter.post('/signup', jsonParser, (request, response, next))`: Creates a new user account and posts it to our database. Once created, the password is replaced with a hashed password and a token is created for the user. Possible responses to this include:

- 200 for a successful post.
- 400 if a bad request
- 409 if any of the existing unique keys are replicated in the post

ID is randomly assigned to each instance by the mongoose middleware.

