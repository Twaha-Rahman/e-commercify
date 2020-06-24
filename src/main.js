'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');

const connectToMongoDb = require('./connect-to-mongodb');
const graphqlSchema = require('./schemas/graphql-schema');

const { PORT } = process.env;
const app = express();

(async function main() {
  try {
    const db = await connectToMongoDb();
    console.log('MongoDB connection was successful!');

    db.onClose(() => {
      console.log('MongoDB connection was closed.');
    });
  } catch (error) {
    console.error('Could not connect to MongoDB!', error);
    process.exitCode = 1;
    return;
  }

  app.use('/api', graphqlHTTP({ schema: graphqlSchema, graphiql: true }));

  app.get('/', (req, res) => {
    res.send('Placeholder Text');
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
