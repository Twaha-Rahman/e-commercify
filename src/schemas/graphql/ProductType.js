'use strict';

const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => {
    return {
      productId: { type: GraphQLID },
      productName: { type: GraphQLString },
      description: { type: GraphQLString },
      productImageLinks: new GraphQLList(GraphQLString),
      quantityType: { type: GraphQLString },
      averageRating: { type: GraphQLInt },
      reviewCount: { type: GraphQLInt },
      category: { type: GraphQLString },
      price: { type: GraphQLString },
      brandName: { type: GraphQLString },
      brandLogoLink: { type: GraphQLString },
      discount: { type: GraphQLString },
      discountedPrice: { type: GraphQLString }
    };
  }
});

module.exports = ProductType;
