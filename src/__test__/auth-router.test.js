'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock, removeAccountMock } from './lib/account-mock';

const apiURL = `http://localhost:${process.env.PORT}/signup`;

describe('auth-router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removeAccountMock);

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
        password: '12345',        
      })
      .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });
  test('POST duplicate key should result in a 409', () => {
    return createAccountMock()
      .then((mockAccount) => {
        return superagent.post(`${apiURL}`)
          .send({
            username: faker.internet.userName(),
            email: mockAccount.account.email,
            password: faker.lorem.words(5),
          })
          .catch((error) => {
            expect(error.status).toEqual(409);
          });
      });
  });
});

