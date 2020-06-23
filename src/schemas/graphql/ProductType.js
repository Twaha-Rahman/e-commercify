'use strict';

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields() {
    return {
      productId: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      imageLinks: { type: new GraphQLList(GraphQLString) },
      quantityType: { type: GraphQLString },
      averageRating: { type: GraphQLFloat },
      reviewCount: { type: GraphQLInt },
      category: { type: GraphQLString },
      price: { type: GraphQLFloat },
      brandName: { type: GraphQLString },
      brandLogoLink: { type: GraphQLString },
      discount: { type: GraphQLString },
      discountedPrice: { type: GraphQLString }
    };
  }
});

module.exports = ProductType;
