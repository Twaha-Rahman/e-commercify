'use strict';

// eslint-disable-next-line
function authTokenValidator(authToken) {
  // We'll use this fn to validate the `authToken` and return extracted data
  // If the `authToken` false, then we'll return an error

  // For now we'll have this placeholder info returned

  const info = {
    userId: '5f0866c8a4e8eee53c23bdf3',
    linkedCompanyId: '5f0087003fb1953310f22b2e'
  };
  return info;
}

module.exports = authTokenValidator;
