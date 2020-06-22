'use strict';

const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = graphql;

const AddProductType = new GraphQLObjectType({
  name: 'AddProduct',
  fields: () => {
    return {
      isSuccessfull: { type: GraphQLBoolean },
      responseMessage: { type: GraphQLString }
    };
  }
});

module.exports = AddProductType;
