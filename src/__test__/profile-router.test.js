'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock } from './lib/account-mock';
import { removeProfileMock } from './lib/profile-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('POST /profiles', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removeProfileMock);
  test('POST /profile should return a 200 & the profile if no errors', () => {
    let accountMock = null;
    return createAccountMock()
      .then((accountSetMock) => {
        accountMock = accountSetMock;
        return superagent.post(`${apiURL}/profiles`)
          .set('Authorization', `Bearer ${accountSetMock.token}`)
          .send({
            bio: 'This is my bio',
            firstName: 'David',
            lastName: 'Stoll',
          });
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.account).toEqual(accountMock.account._id.toString());
        expect(response.body.firstName).toEqual('David');
        expect(response.body.lastName).toEqual('Stoll');
        expect(response.body.bio).toEqual('This is my bio');
      });
  });
  test('POST /profiles should return 400 error if no token', () => {
    return createAccountMock()
      .then(() => {
        return superagent.post(`${apiURL}/profiles`)
          .send({
            bio: 'This is my bio',
            firstName: 'David',
            lastName: 'Stoll',
          });
      })
      .then(Promise.reject)
      .catch((error) => {
        expect(error.status).toEqual(400);
      });
  });
  describe('GET /profiles', () => {
    test('GET /profile should return a 200 & profile', () => {
      // return createProfileMock()
      //   .then((mock) => {
      //     return superagent.get(`${apiURL}/profiles`)
      //       .auth()
      //   })
    });
  });
});

