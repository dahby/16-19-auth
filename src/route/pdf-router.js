'use strict';

import multer from 'multer';
import { Router } from 'express';
import HttpError from 'http-errors';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import Pdf from '../model/pdf';
import { s3Upload /* , s3Remove */ } from '../lib/s3';

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const pdfRouter = new Router();

pdfRouter.post('./pdf', bearerAuthMiddleware, multerUpload.any(), (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(404, 'PDF ROUTER _ERROR_, not found'));
  }
  if (!request.body.title || request.files.length > 1 || request.files[0].fieldname !== 'pdf') {
    return next(new HttpError(400, 'PDF ROUTER _ERROR_, invalid request'));
  }

  const file = request.files[0];
  const key = `${file.filename}.${file.originalname}`;

  return s3Upload(file.path, key)
    .then((url) => {
      return new Pdf({
        title: request.body.title,
        account: request.account._id,
        url,
      }).save();
    })
    .then(pdf => response.json(pdf))
    .catch(next);
});

export default pdfRouter;
