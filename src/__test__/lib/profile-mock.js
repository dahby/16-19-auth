'use strict';

import faker from 'faker';
import Profile from '../../model/profile';
import { createAccountMock, removeAccountMock } from './account-mock';

const createProfileMock = () => {
  const resultMock = {};

  return createAccountMock()
    .then((accountSetMock) => {
      resultMock.accountSetMock = accountSetMock;

      return new Profile({
        bio: faker.lorem.words(10),
        picture: faker.random.image(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        favoriteColor: faker.lorem.words(1),
        location: faker.locale.words(2),
        account: accountSetMock.account._id,
      }).save();
    })
    .then((profile) => {
      resultMock.profile = profile;
      return resultMock;
    });
};

const removeProfileMock = () => {
  return Promise.all([
    Profile.remove({}),
    removeAccountMock(),
  ]);
};

export { createProfileMock, removeProfileMock };
