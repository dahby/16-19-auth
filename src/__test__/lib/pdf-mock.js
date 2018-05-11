'use strict';

import faker from 'faker';
import { createAccountMock } from './account-mock';
import Pdf from '../../model/pdf';
import Account from '../../model/account';

const createPdfMock = () => {
  const resultMock = {};
  return createAccountMock()
    .then((mockAcctResponse) => {
      resultMock.accountMock = mockAcctResponse;

      return new Pdf({
        title: faker.lorem.words(5),
        url: faker.random.image(),
        key: faker.random.number(),
        account: resultMock.accountMock.account._id,
      }).save();
    })
    .then((pdf) => {
      resultMock.pdf = pdf;
      return resultMock;
    });
};

const removePdfMock = () => Promise.all([Account.remove({}), Pdf.remove({})]);

export { createPdfMock, removePdfMock }; 
