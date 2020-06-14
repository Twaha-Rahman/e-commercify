'use strict';

const graphql = require('graphql');

const ProductType = require('./graphql/ProductType');
const ReviewType = require('./graphql/ReviewType');

const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

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
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      description: 'Read or write reviews objects',
      args: { linkedProductId: { type: GraphQLID } },
      resolve: (parent, args) => {
        return [
          {
            linkedProductId: '...',
            username: '...',
            userId: '...',
            profilePicture: '...',
            date: '...',
            comment: '...',
            rating: 5
          },
          {
            linkedProductId: '...',
            username: '...',
            userId: '...',
            profilePicture: '...',
            date: '...',
            comment: '...',
            rating: 5
          },
          {
            linkedProductId: '...',
            username: '...',
            userId: '...',
            profilePicture: '...',
            date: '...',
            comment: '...',
            rating: 5
          }
        ];
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
