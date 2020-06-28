'use strict';

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = require('graphql');

const Product = require('../models/db/product');
const ProductType = require('./graphql/ProductType');
const BannerType = require('./graphql/BannerType');
const Review = require('../models/db/review');
const ReviewType = require('./graphql/ReviewType');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      description: 'Retrieves product data',
      type: new GraphQLList(ProductType),
      args: {
        productId: { type: GraphQLID }
      },
      async resolve(parent, { productId }) {
        if (productId) {
          /*
           * Assumes the db contains at most one product with the given id,
           *   so that we do not need to look for more than one product.
           */
          const product = await Product.findOne({ productId });
          if (product === null) return [];
          return [product];
        } else {
          // Returns an array of all the product objects.
          return await Product.find();
        }
      }
    },
    banners: {
      type: new GraphQLList(BannerType),
      description: 'Retrieves or updates the Banners',
      resolve: () => {
        return [
          {
            bannerImageLink: 'https://www.youtube.com/',
            bannerGoToLink: 'https://www.twitter.com/',
            text: 'Placeholder'
          },
          {
            bannerImageLink: 'https://www.youtube.com/',
            bannerGoToLink: 'https://www.twitter.com/',
            text: 'Placeholder'
          },
          {
            bannerImageLink: 'https://www.youtube.com/',
            bannerGoToLink: 'https://www.twitter.com/',
            text: 'Placeholder'
          }
        ];
      }
    },
    reviews: {
      description: 'Read or write reviews objects',
      type: new GraphQLList(ReviewType),
      args: {
        linkedProductId: { type: GraphQLID }
      },
      async resolve(parent, { linkedProductId }) {
        if (linkedProductId) {
          // Returns an array of the matching review objects.
          return await Review.find({ linkedProductId });
        } else {
          // Returns an array of all the review objects.
          return await Review.find();
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
