'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./schemas/graphql-schema');

const app = express();

app.use('/api', graphqlHTTP({ schema: graphqlSchema, graphiql: true }));

app.get('/', (req, res) => {
  res.send('Placeholder Text');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((client) => {
    console.log('Connection successful!');

    if (!process.env.IS_PRODUCTION) {
      client.models.Product.countDocuments().then((count) =>
        console.log('There are %s products in the db.', count)
      );
    }
  })
  .catch((error) => {
    console.log('Could not connect to MongoDB!', error);
  });

db.onClose(() => {
  console.log(`Connection ${db.is} was closed.`);
});
