'use strict';

require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cookieParser = require('cookie-parser');

const connectToMongoDb = require('./modules/connect-to-mongodb');
const graphqlSchema = require('./schemas/graphql-schema');
const cookieChecker = require('./modules/cookie-checker');

const { PORT } = process.env;
const app = express();

(async function main() {
  await connectToMongoDb();

  app.use(
    '/api',
    cookieParser(),
    cookieChecker,
    graphqlHTTP((req, res) => {
      return {
        schema: graphqlSchema,
        graphiql: true,
        context: { req, res }
      };
    })
  );

  app.get('/', (req, res) => {
    res.send('Placeholder Text');
  });

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
})();
