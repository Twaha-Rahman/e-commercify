'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');

const connectToMongoDb = require('./connect-to-mongodb');
const graphqlSchema = require('./schemas/graphql-schema');

const { PORT } = process.env;
const app = express();

connectToMongoDb()
  .then((db) => {
    console.log('MongoDB connection was successful!');

    db.onClose(() => {
      console.log(`MongoDB connection was closed.`);
    });

    app.use('/api', graphqlHTTP({ schema: graphqlSchema, graphiql: true }));

    app.get('/', (req, res) => {
      res.send('Placeholder Text');
    });

    app.listen(PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB!', error);
  });
