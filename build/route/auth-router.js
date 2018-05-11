'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _bodyParser = require('body-parser');

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _logger = require('../lib/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authRouter = new _express.Router();
var jsonParser = (0, _bodyParser.json)();

authRouter.post('/signup', jsonParser, function (request, response, next) {
  return _account2.default.create(request.body.username, request.body.email, request.body.password).then(function (account) {
    delete request.body.password;
    _logger2.default.log(_logger2.default.INFO, 'AUTH - creating TOKEN');
    return account.createToken();
  }).then(function (token) {
    _logger2.default.log(_logger2.default.INFO, 'AUTH - returning a 200 code and a token');
    return response.json({ token: token });
  }).catch(next);
});

exports.default = authRouter;