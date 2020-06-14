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
