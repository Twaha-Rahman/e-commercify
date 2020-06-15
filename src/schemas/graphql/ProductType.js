'use strict';

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const DiscountType = require('./DiscountType');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields() {
    return {
      averageRating: { type: GraphQLFloat },
      brandLogoLink: { type: GraphQLString },
      brandName: { type: GraphQLString },
      category: { type: GraphQLString },
      description: { type: GraphQLString },
      discountedPrice: { type: GraphQLString },
      discounts: { type: new GraphQLList(DiscountType) },
      imageLinks: { type: new GraphQLList(GraphQLString) },
      name: { type: GraphQLString },
      price: { type: GraphQLFloat },
      productId: { type: GraphQLID },
      quantityType: { type: GraphQLString },
      reviewCount: { type: GraphQLInt }
    };
  }
});

module.exports = ProductType;
