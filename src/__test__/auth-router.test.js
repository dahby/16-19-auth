'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { removeAccountMock } from './lib/account-mock';

const apiURL = `http://localhost:${process.env.PORT}/signup`;

describe('auth-router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removeAccountMock);

  test('POST should return 200 & TOKEN', () => {
    return superagent.post(apiURL)
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
});
