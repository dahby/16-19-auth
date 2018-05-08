'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { removeAccountMock } from './lib/account-mock';

const apiURL = `http://localhost:${process.env.PORT}/signup`;

describe('auth-router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removeAccountMock);
  // afterAll(removeAccountMock);

  test('POST should return 200 & TOKEN', () => {
    return superagent.post(`${apiURL}`)
      .send({
        username: 'david',
        email: 'david@david.com',
        password: 'davidspassword1',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });
  test('POST bad request should return a 400', () => {
    return superagent.post(`${apiURL}`)
      .send({
        username: 'dave',
        email: 'dave@dave.com',
      })
      .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });
  test('POST duplicate key should result in a 409', () => {
    return superagent.post(`${apiURL}`)
      .send({
        username: 'david',
        // email: 'david@david.com',
        // password: 'davidspassword1',
      })
      // .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(409);
      });
  });
});

