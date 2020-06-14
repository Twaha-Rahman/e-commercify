const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = graphql;

const ReviewType = new GraphQLObjectType({
  name: 'Review',
  fields: () => {
    return {
      linkedProductId: { type: GraphQLID },
      userId: { type: GraphQLID },
      username: { type: GraphQLString },
      profilePicture: { type: GraphQLString },
      date: { type: GraphQLString },
      comment: { type: GraphQLString },
      rating: { type: GraphQLInt }
    };
  }
});

module.exports = ReviewType;
