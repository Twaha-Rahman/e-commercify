/**
 * @file ReviewType.js - GraphQL schema for review objects.
 */

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt
} = require('graphql');

const GraphQLDate = require('./DateType');

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => {
    return {
      linkedProductId: { type: GraphQLID },
      userId: { type: GraphQLID },
      date: { type: GraphQLDate },
      comment: { type: GraphQLString },
      rating: { type: GraphQLInt }
    };
  }
});

module.exports = ReviewType;
