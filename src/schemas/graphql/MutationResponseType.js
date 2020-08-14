/**
 * @file MutationResponseType.js - GraphQL schema for MutationResponse objects.
 */
'use strict';

const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const AddProductType = new GraphQLObjectType({
  name: 'AddProduct',
  fields: {
    isSuccessful: { type: GraphQLBoolean },
    responseMessage: { type: GraphQLString },
    data: { type: GraphQLString }
  }
});

module.exports = AddProductType;
