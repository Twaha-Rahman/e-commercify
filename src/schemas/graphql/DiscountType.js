'use strict';

const {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const DiscountKindType = new GraphQLEnumType({
  name: 'DiscountKind',
  values: {
    flat: {
      value: 1
    },
    percentage: {
      value: 2
    }
  }
});

const DiscountType = new GraphQLObjectType({
  name: 'Discount',
  fields() {
    return {
      discountId: { type: GraphQLID },
      discountName: { type: GraphQLString },
      maxQuantity: { type: GraphQLInt },
      minQuantity: { type: GraphQLInt },
      type: { type: DiscountKindType },
      value: { type: GraphQLFloat }
    };
  }
});

module.exports = DiscountType;
