/**
 * @file main.js - Entry point of the e-commercify application.
 */

require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');

const connectToMongoDb = require('./modules/connect-to-mongodb');
const graphqlSchema = require('./schemas/graphql-schema');

const { PORT } = process.env;
const app = express();

(async function main() {
  await connectToMongoDb();

  app.use(helmet());
  app.use('/api', graphqlHTTP({ schema: graphqlSchema, graphiql: true }));

  app.get('/', (req, res) => {
    res.send('Placeholder Text');
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
