'use strict';

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLError
} = require('graphql');

const Product = require('../models/db/product');
const ProductType = require('./graphql/ProductType');
const MutationResponseType = require('./graphql/MutationResponseType');
const BannerType = require('./graphql/BannerType');
const Review = require('../models/db/review');
const ReviewType = require('./graphql/ReviewType');
const Banner = require('../models/db/banner');

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
      description: 'Retrieves the Banners',
      async resolve() {
        const banners = await Banner.find();

        return banners;
      }
    },
    reviews: {
      description: 'This endpoint is used to retrieve review objects',
      type: new GraphQLList(ReviewType),
      args: {
        linkedProductId: { type: GraphQLID }
      },
      async resolve(parent, { linkedProductId }) {
        if (!linkedProductId) {
          return new GraphQLError({
            message: 'Error: `linkedProductId` not provided!'
          });
        }
        return await Review.find({ linkedProductId });
      }
    }
  }
});

// All mutation requests must have a `userToken` key which will be used to see
// if the user is authorized AND has the required permissions

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description:
    'This mutation endpoint is used to create, update or remove data.',
  fields: {
    addProduct: {
      type: MutationResponseType,
      description: 'This endpoint is used to add product data',
      args: {
        authToken: { type: GraphQLString },
        productData: { type: GraphQLString }, // productData is in JSON
        userIdOfWhoAdded: { type: GraphQLID },
        clientBrowserInfo: { type: GraphQLString },
        clientIpAddress: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (!process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        return {
          isSuccessful: true,
          responseMessage: 'Product was successfully added!',
          data: '...'
        };
      }
    },
    updateProduct: {
      type: MutationResponseType,
      description: 'This endpoint is used to update product data',
      args: {
        authToken: { type: GraphQLString },
        productId: { type: GraphQLID },
        infoToUpdate: { type: GraphQLString }, // infoToUpdate is in JSON
        userIdOfWhoUpdated: { type: GraphQLID },
        clientBrowserInfo: { type: GraphQLString },
        clientIpAddress: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        return {
          isSuccessful: true,
          responseMessage: 'Product was successfully updated!',
          data: '...'
        };
      }
    },
    deleteProduct: {
      type: MutationResponseType,
      description: 'This endpoint is used to delete product data',
      args: {
        authToken: { type: GraphQLString },
        productId: { type: GraphQLID },
        userIdOfWhoDeleted: { type: GraphQLID },
        clientBrowserInfo: { type: GraphQLString },
        clientIpAddress: { type: GraphQLString }
      },
      resolve(parent, args) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        return {
          isSuccessful: true,
          responseMessage: 'Product was successfully deleted!',
          data: '...'
        };
      }
    },
    addBanner: {
      type: MutationResponseType,
      description: 'This endpoint is used to add banner',
      args: {
        authToken: { type: GraphQLString },
        newBannerData: { type: GraphQLString },
        clientBrowserInfo: { type: GraphQLString },
        clientIpAddress: { type: GraphQLString }
      },
      async resolve(parent, args) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        const {
          authToken, // eslint-disable-line
          newBannerData,
          clientBrowserInfo,
          clientIpAddress
        } = args;

        // We'll be using the `authToken` to authenticate
        // and determine the `userIdOfWhoAdded`

        let response;

        try {
          const receivedBannerObject = JSON.parse(newBannerData);

          const newBannerObject = {
            ...receivedBannerObject,
            dateAdded: Date.now(),
            userIdOfWhoAdded: '5eeb93d96c4353087872e300', // placeholder
            clientBrowserInfo,
            clientIpAddress
          };

          const newBannerDocument = new Banner(newBannerObject);
          const savedBanner = await newBannerDocument.save();
          response = {
            isSuccessful: true,
            responseMessage: 'Successfully added banner!',
            data: JSON.stringify(savedBanner)
          };
        } catch (error) {
          if (process.env.IS_PRODUCTION === 'false') {
            console.log(error);
          }
          response = new GraphQLError({
            isSuccessful: false,
            responseMessage: 'Failed to add banner!',
            data: 'N/A'
          });
        }

        return response;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
