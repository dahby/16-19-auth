'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import Profile from '../model/profile';

const profileRouter = new Router();
const jsonParser = json();

profileRouter.post('/profiles', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }
  return new Profile({
    ...request.body,
    account: request.account._id,
  }) 
    .save()
    .then((profile) => {
      logger.log(logger.INFO, 'Returning 200 and new profile');
      return response.json(profile);
    })
    .catch(next);
});

export default profileRouter;
