'use strict';

const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const ProductType = new GraphQLObjectType({
  name: 'Banner',
  fields: () => {
    return {
      bannerImageLink: { type: GraphQLString },
      bannerGoToLink: { type: GraphQLString },
      text: { type: GraphQLString }
    };
  }
});

module.exports = ProductType;
