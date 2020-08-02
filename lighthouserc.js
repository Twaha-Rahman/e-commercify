module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand:
        'npm run start & cd frontend && npm run serve & sleep 15 && cd ../' // eslint-disable-line
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
