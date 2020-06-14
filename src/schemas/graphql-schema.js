'use strict';

const graphql = require('graphql');

const ProductType = require('./graphql/ProductType');

const { GraphQLObjectType, GraphQLSchema, GraphQLID } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: ProductType,
      args: { productId: { type: GraphQLID } },
      resolve: (parent, args) => {
        // We'll receive the data here from the DB and return it.
        // For now we'll have some dummy data.
        return {
          productId: args.productId,
          productName: 'Placeholder'
        };
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
