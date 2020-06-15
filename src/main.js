'use strict';

require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./schemas/graphql-schema');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connection;

app.use('/api', graphqlHTTP({ schema: graphqlSchema, graphiql: true }));

app.get('/', (req, res) => {
  res.send('Placeholder Text');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((client) => {
    console.log('Connection successful!');
  })
  .catch((error) => {
    console.log('Could not connect to MongoDB!', error);
  });

db.onClose(() => {
  console.log(`Connection ${db.is} was closed.`);
});
