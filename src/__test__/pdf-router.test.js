'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createPdfMock, removePdfMock } from './lib/pdf-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('TESTING ROUTES AT /pdf', () => {
  beforeAll(startServer);
  afterEach(removePdfMock);
  afterAll(stopServer);

  describe('POST /pdf', () => {
    test('should return 200 for successful POST', () => {
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
    test('should return 400 for bad POST request', () => {
      return createPdfMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.post(`${apiURL}/pdf`)
            .set('Authorization', `Bearer ${token}`)
            .attach('pdf', `${__dirname}/assets/doc.pdf`)
            .then(Promise.reject)
            .catch((error) => {
              expect(error.status).toEqual(400);
            });
        });
    });
    test('POST should return 401 for bad token', () => {
      return createPdfMock()
        .then(() => {
          return superagent.post(`${apiURL}/pdf`)
            .set('Authorization', 'Bearer badToken')
            .field('title', 'very important document')
            .attach('pdf', `${__dirname}/assets/doc.pdf`)
            .then(Promise.reject);
        })
        .catch((error) => {
          expect(error.status).toEqual(401);
        });
    });
  });
  describe('GET /pdf', () => {
    test('should return 200 and the returned object', () => {
      return createPdfMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.get(`${apiURL}/pdf/${mockResponse.pdf._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body.title).toEqual(mockResponse.pdf.title);
              expect(response.body._id).toEqual(mockResponse.pdf._id.toString());
              expect(response.body.url).toEqual(mockResponse.pdf.url);
            });
        })
        .catch((error) => {
          expect(error.status).toEqual(200);
        });
    });
    test('should return 401 for bad token', () => {
      return createPdfMock()
        .then((mockResponse) => {
          return superagent.get(`${apiURL}/pdf/${mockResponse.pdf._id}`)
            .set('Authorization', 'Bearer badToken')
            .then(Promise.reject);
        })
        .catch((error) => {
          expect(error.status).toEqual(401);
        });
    });
    test('should return 404 for bad id', () => {
      return createPdfMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.get(`${apiURL}/pdf/badId`)
            .set('Authorization', `Bearer ${token}`)
            .then(Promise.reject)
            .catch((error) => {
              expect(error.status).toEqual(404);
            });
        });
    });
  });
  describe('DELETE /pdf', () => {
    test('should return 204 for successful deletion', () => {
      return createPdfMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.delete(`${apiURL}/pdf/${mockResponse.pdf._id}`)
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.status).toEqual(204);
            });
        });
    });
    test('should return 401 for bad token', () => {
      return createPdfMock()
        .then((mockResponse) => {
          return superagent.delete(`${apiURL}/pdf/${mockResponse.pdf._id}`)
            .set('Authorization', 'Bearer badToken')
            .then(Promise.reject);
        })
        .catch((error) => {
          expect(error.status).toEqual(401);
        });
    });
    test('should return 404 for bad id', () => {
      return createPdfMock()
        .then((mockResponse) => {
          const { token } = mockResponse.accountMock;
          return superagent.delete(`${apiURL}/pdf/badId`)
            .set('Authorization', `Bearer ${token}`)
            .then(Promise.reject)
            .catch((error) => {
              expect(error.status).toEqual(404);
            });
        });
    });
  });
});
