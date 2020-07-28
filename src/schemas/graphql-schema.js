/**
 * @file graphql-schema.js - RootQuery and RootMutation GraphQL schemas.
 */
'use strict';

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
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
const paginate = require('../modules/paginate');

const getIpAddress = require('../modules/get-ip-address');

const activityLogger = require('../modules/log-activity');
const authTokenValidator = require('../modules/auth-token-validator');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      description: 'Retrieves product data',
      type: new GraphQLList(ProductType),
      args: {
        itemsPerPage: { type: GraphQLInt },
        page: { type: GraphQLInt },
        productId: { type: GraphQLID }
      },
      async resolve(parent, { productId, itemsPerPage, page }) {
        if (productId) {
          /*
           * Assumes the db contains at most one product with the given id,
           *   so that we do not need to look for more than one product.
           */
          const product = await Product.findOne({ productId });
          if (product === null) return [];
          return [product];
        } else {
          // Returns a page of product data as an array of plain objects.
          return await paginate(Product.find().lean(), { itemsPerPage, page });
        }
      }
    },
    banners: {
      type: new GraphQLList(BannerType),
      description: 'Retrieves the Banners',
      args: {
        itemsPerPage: { type: GraphQLInt },
        page: { type: GraphQLInt }
      },
      async resolve(parent, { itemsPerPage, page }) {
        // Returns a page of banner data as an array of plain objects.
        return await paginate(Banner.find().lean(), { itemsPerPage, page });
      }
    },
    reviews: {
      description: 'This endpoint is used to retrieve review objects',
      type: new GraphQLList(ReviewType),
      args: {
        itemsPerPage: { type: GraphQLInt },
        linkedProductId: { type: GraphQLID },
        page: { type: GraphQLInt }
      },
      async resolve(parent, { linkedProductId, itemsPerPage, page }) {
        if (!linkedProductId) {
          return new GraphQLError({
            message: 'Error: `linkedProductId` not provided!'
          });
        }
        // Returns a page of matching reviews as an array of plain objects.
        const pagedData = await paginate(
          Review.find({ linkedProductId }).lean(),
          {
            itemsPerPage,
            page
          }
        );
        return pagedData;
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'This endpoint is used to create, update or remove data.',
  fields: {
    addProduct: {
      type: MutationResponseType,
      description: 'This endpoint is used to add product data',
      args: {
        authToken: { type: GraphQLString },
        productData: { type: GraphQLString },
        clientBrowserInfo: { type: GraphQLString }
      },
      async resolve(
        parent,
        { authToken, productData, clientBrowserInfo },
        requestObj
      ) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log({
            authToken,
            productData,
            clientBrowserInfo
          });
        }

        // Extract the IP Address of the client from the request object
        // We may recieve IPv4 or IPv6, so we'll need to handle that

        const clientIpAddress =
          requestObj.headers['x-forwarded-for'] ||
          requestObj.connection.remoteAddress;

        // Check if all the required fields are provided

        if (!authToken) {
          throw new GraphQLError({
            message: 'The `authToken` field was not provided!'
          });
        }

        if (!productData) {
          throw new GraphQLError({
            message: 'The `productData` field was not provided!'
          });
        }

        if (!clientBrowserInfo) {
          throw new GraphQLError({
            message: 'The `clientBrowserInfo` field was not provided!'
          });
        }

        const validatedAuthTokenInfos = authTokenValidator(authToken);

        let response;

        if (validatedAuthTokenInfos) {
          try {
            const isActivityLogSaved = await activityLogger({
              ...validatedAuthTokenInfos,
              timestamp: Date.now(),
              clientBrowserInfo,
              clientIpAddress
            });

            console.log(isActivityLogSaved);

            if (!isActivityLogSaved) {
              throw new Error('Failed to save activity log!');
            }

            const productInfoObj = JSON.parse(productData);

            // We'll have to generate unique names for each image
            // we can use the ObjectId from Mongoose here
            productInfoObj.imageLinks = [
              'placeholder',
              'placeholder',
              'placeholder'
            ];

            const productDocument = new Product(productInfoObj);

            await productDocument.save();

            response = {
              isSuccessful: true,
              responseMessage: 'Product was successfully added!',
              data: '...'
            };
          } catch (error) {
            console.error(error);
            response = {
              isSuccessful: false,
              responseMessage:
                'An error occured while trying to save the product!'
            };
          }
        } else {
          response = new GraphQLError({
            message: 'Invalid `authToken` provided!'
          });
        }

        return response;
      }
    },
    updateProduct: {
      type: MutationResponseType,
      description: 'This endpoint is used to update product data',
      args: {
        authToken: { type: GraphQLString },
        productId: { type: GraphQLID },
        infoToUpdate: { type: GraphQLString }, // infoToUpdate is in JSON
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
        bannerData: { type: GraphQLString },
        clientBrowserInfo: { type: GraphQLString },
        clientIpAddress: { type: GraphQLString }
      },
      async resolve(parent, args) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        const {
          authToken, // eslint-disable-line
          bannerJSON,
          clientBrowserInfo,
          clientIpAddress
        } = args;

        // We'll be using the `authToken` to authenticate
        // and determine the `userIdOfWhoAdded`

        // We'll have to save some activity log in the DB

        let response;

        try {
          const receivedBannerObject = JSON.parse(bannerJSON);

          const newBannerObject = {
            ...receivedBannerObject,
            dateAdded: Date.now(),
            userIdOfWhoAdded: '5eeb93d96c4353087872e300', // placeholder
            clientBrowserInfo,
            clientIpAddress
          };

          const bannerDocument = new Banner(newBannerObject);
          const savedBanner = await bannerDocument.save();
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
    },
    deleteBanner: {
      type: MutationResponseType,
      description: 'This endpoint is used to delete banner data',
      args: {
        authToken: { type: GraphQLString },
        bannerId: { type: GraphQLID },
        clientBrowserInfo: { type: GraphQLString },
        clientIpAddress: { type: GraphQLString }
      },
      async resolve(parent, args) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        // We'll have to save some activity log in the DB

        const { bannerId } = args;

        const status = await Banner.findOneAndDelete({ bannerId });

        let response;

        if (status) {
          response = {
            isSuccessful: true,
            responseMessage: 'Banner was successfully deleted!',
            data: JSON.stringify(status)
          };
        } else {
          response = {
            isSuccessful: false,
            responseMessage: 'Failed to delete Banner!',
            data: 'N/A'
          };
        }

        return response;
      }
    },
    addReview: {
      type: MutationResponseType,
      description: 'This endpoint is used to add a review',
      args: {
        authToken: { type: GraphQLString },
        reviewJSON: { type: GraphQLString },
        clientBrowserInfo: { type: GraphQLString }
      },
      async resolve(parent, args, requestObj) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        const {
          authToken, // eslint-disable-line
          reviewJSON,
          clientBrowserInfo // eslint-disable-line
        } = args;

        const clientIpAddress = getIpAddress(requestObj); // eslint-disable-line

        // `clientBrowserInfo` and `clientIpAddress` will
        //  be used to log the activity

        // We'll be using the `authToken` to authenticate
        // and determine the `userIdOfWhoAdded`

        // We'll have to save some activity log in the DB

        let response;

        try {
          const receivedReviewObject = JSON.parse(reviewJSON);

          const newReviewObject = {
            ...receivedReviewObject,
            userId: '5eeb93d96c4353087872e300' // placeholder
          };

          const reviewDocument = new Review(newReviewObject);
          const savedReview = await reviewDocument.save();
          response = {
            isSuccessful: true,
            responseMessage: 'Successfully added the review!',
            data: JSON.stringify(savedReview)
          };
        } catch (error) {
          if (process.env.IS_PRODUCTION === 'false') {
            console.log(error);
          }
          response = new GraphQLError({
            isSuccessful: false,
            responseMessage: 'Failed to add review!',
            data: 'N/A'
          });
        }

        return response;
      }
    },
    deleteReview: {
      type: MutationResponseType,
      description: 'This endpoint is used to delete a review',
      args: {
        authToken: { type: GraphQLString },
        reviewId: { type: GraphQLID },
        clientBrowserInfo: { type: GraphQLString }
      },
      async resolve(parent, args, requestObj) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        // We'll have to save some activity log in the DB
        // We'll use the following variables for the activity log -
        // `authToken`, `clientBrowserInfo` and `clientIpAddress`

        const clientIpAddress = getIpAddress(requestObj); // eslint-disable-line

        const { authToken, reviewId, clientBrowserInfo } = args; // eslint-disable-line
        let response;

        try {
          const status = await Review.findOneAndDelete({ _id: reviewId });

          if (status) {
            response = {
              isSuccessful: true,
              responseMessage: 'Review was successfully deleted!',
              data: JSON.stringify(status)
            };
          } else {
            throw new Error('Failed to delete the review!');
          }
        } catch (error) {
          response = {
            isSuccessful: false,
            responseMessage: 'Failed to delete the review!',
            data: 'N/A'
          };
        }

        return response;
      }
    },
    updateReview: {
      type: MutationResponseType,
      description: 'This endpoint is used to update review data',
      args: {
        authToken: { type: GraphQLString },
        reviewId: { type: GraphQLID },
        infoToUpdateJSON: { type: GraphQLString },
        clientBrowserInfo: { type: GraphQLString }
      },
      async resolve(parent, args, requestObj) {
        if (process.env.IS_PRODUCTION === 'false') {
          console.log(args);
        }

        // We'll have to save some activity log in the DB
        // We'll use the following variables for the activity log -
        // `authToken`, `clientBrowserInfo` and `clientIpAddress`

        const clientIpAddress = getIpAddress(requestObj); // eslint-disable-line

        const {
          authToken, // eslint-disable-line
          reviewId,
          infoToUpdateJSON,
          clientBrowserInfo // eslint-disable-line
        } = args;

        let response;

        try {
          const infoToUpdate = JSON.parse(infoToUpdateJSON);

          const updatedReview = await Review.findOneAndUpdate(
            { _id: reviewId },
            infoToUpdate,
            { new: true, useFindAndModify: true }
          );

          response = {
            isSuccessful: true,
            responseMessage: 'Updated the review!',
            data: JSON.stringify(updatedReview)
          };
        } catch (error) {
          response = {
            isSuccessful: false,
            responseMessage: 'Failed to update the review!',
            data: 'N/A'
          };
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
