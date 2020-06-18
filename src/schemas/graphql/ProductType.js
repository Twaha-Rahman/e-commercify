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
      productId: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      productImageLinks: { type: new GraphQLList(GraphQLString) },
      quantityType: { type: GraphQLString },
      averageRating: { type: GraphQLFloat },
      reviewCount: { type: GraphQLInt },
      category: { type: GraphQLString },
      price: { type: GraphQLFloat },
      brandName: { type: GraphQLString },
      brandLogoLink: { type: GraphQLString },
      discounts: { type: new GraphQLList(DiscountType) }
    };
  }
});

module.exports = ProductType;
