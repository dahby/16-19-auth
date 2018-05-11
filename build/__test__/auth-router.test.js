'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../lib/server');

var _accountMock = require('./lib/account-mock');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiURL = 'http://localhost:' + process.env.PORT + '/signup';

describe('auth-router', function () {
  beforeAll(_server.startServer);
  afterAll(_server.stopServer);
  afterEach(_accountMock.removeAccountMock);

  test('POST should return 200 & TOKEN', function () {
    return _superagent2.default.post('' + apiURL).send({
      username: 'david',
      email: 'david@david.com',
      password: 'davidspassword1'
    }).then(function (response) {
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeTruthy();
    });
  });
  test('POST bad request should return a 400', function () {
    return _superagent2.default.post('' + apiURL).send({
      username: 'dave',
      password: '12345'
    }).then(Promise.reject).catch(function (error) {
      expect(error.status).toEqual(400);
    });
  });
  test('POST duplicate key should result in a 409', function () {
    return (0, _accountMock.createAccountMock)().then(function (mockAccount) {
      return _superagent2.default.post('' + apiURL).send({
        username: _faker2.default.internet.userName(),
        email: mockAccount.account.email,
        password: _faker2.default.lorem.words(5)
      }).then(Promise.reject).catch(function (error) {
        expect(error.status).toEqual(409);
      });
    });
  });
});