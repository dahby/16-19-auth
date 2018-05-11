'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createPdfMock, removePdfMock } from './lib/pdf-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('TESTING ROUTES AT /pdf', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(removePdfMock);

  describe('POST 200 for successful post to /pdf', () => {
    test('should return 200', () => {
      return createPdfMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.post(`${apiURL}/pdf`)
            .set('Authorization', `Bearer ${token}`)
            .field('title', 'very important document')
            .attach('pdf', `${__dirname}/assets/doc.pdf`)
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body.title).toEqual('very important document');
              expect(response.body._id).toBeTruthy();
              expect(response.body.url).toBeTruthy();
            });
        })
        .catch((error) => {
          expect(error.status).toEqual(200);
        });
    });
  });
});
