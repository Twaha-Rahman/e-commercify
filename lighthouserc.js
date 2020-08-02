/**
 * @file - Conifiguration for LightHouse CI. Vist the link below
 * for more details ->
 * https://github.com/GoogleChrome/lighthouse/blob/master/docs/configuration.md
 */

module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:8080/'],
      startServerCommand:
        'npm run start & cd frontend && npm run serve & sleep 15 && cd ../' // eslint-disable-line
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
