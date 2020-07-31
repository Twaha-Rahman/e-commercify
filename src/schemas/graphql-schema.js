'use strict';

const { JWT_SECRET_KEY } = process.env;

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLError
} = require('graphql');
const { sign, verify } = require('jsonwebtoken');

const Product = require('../models/db/product');
const ProductType = require('./graphql/ProductType');
const MutationResponseType = require('./graphql/MutationResponseType');
const BannerType = require('./graphql/BannerType');
const Review = require('../models/db/review');
const ReviewType = require('./graphql/ReviewType');
const Banner = require('../models/db/banner');
const paginate = require('../modules/paginate');

const getIpAddress = require('../modules/get-ip-address');
const logger = require('../modules/logger');

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
        productJSON: { type: GraphQLString },
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
        infoToUpdateJSON: { type: GraphQLString },
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
    },
    login: {
      type: MutationResponseType,
      description: 'This endpoint is used to log in a user',
      args: {
        userName: { type: GraphQLString },
        password: { type: GraphQLString },
        clientBrowserInfo: { type: GraphQLString }
      },
      resolve(parent, args, context) {
        logger('Login payload', 'info', args);

        const { req, res } = context;

        const clientIp = getIpAddress(req); //eslint-disable-line

        // We verify the user here and try to log them in...
        const { userName, password } = args; // eslint-disable-line
        // .... (let's assume it's a success)
        const isValidCredentials = true;

        let response;

        if (isValidCredentials) {
          // Successfully logged user in, so now we'll give them the
          // access token (JWT) and the refresh token (HTTPOnly Cookie)

          // We'll retrieve these info about the user from the DB
          const jwtPayload = {
            userId: '5f0866c8a4e8eee53c23bde5',
            permissions: {
              placeholderKey: 'placeholderValue'
            }
          };

          const accessToken = sign(jwtPayload, JWT_SECRET_KEY, {
            expiresIn: '15min'
          });

          const refreshTokenPayload = {
            userId: '5f0866c8a4e8eee53c23bde5',
            count: 1,
            refreshTokenId: '7k0957c8n4e8eee53c23fgt5'
          };
          // We'll be storing this `refreshTokenId` in the DB
          // in the user's document so that we can verify it later on

          const refreshToken = sign(refreshTokenPayload, JWT_SECRET_KEY, {
            expiresIn: '30d'
          });

          res.cookie('refreshToken', refreshToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days in ms
            httpOnly: true
          });

          response = {
            isSuccessful: true,
            responseMessage: 'Successfully Logged In!',
            data: accessToken
          };
        } else {
          response = {
            isSuccessful: false,
            responseMessage: 'Failed to log in user!',
            data: 'N/A'
          };
        }

        return response;
      }
    },
    refreshToken: {
      type: MutationResponseType,
      description: 'This endpoint is used to refresh JWT token',
      args: {
        jwt: { type: GraphQLString },
        clientBrowserInfo: { type: GraphQLString }
      },
      resolve(parent, args, context) {
        logger('refreshToken payload', 'info', args);

        const { req, res } = context;

        const clientIp = getIpAddress(req); //eslint-disable-line

        // We get the verified `refreshToken` payload (if it exists)
        const { refreshTokenPayload } = req;

        let response;

        if (refreshTokenPayload) {
          console.log(refreshTokenPayload);

          let accessTokenInfo;

          // If the request has a verified `accessToken` then we'll use
          // it's data. If it doesn't have it, then we'll load the required data
          // from the DB
          if (args.jwt) {
            try {
              accessTokenInfo = verify(args.jwt, JWT_SECRET_KEY);
            } catch (error) {
              console.log(error);
              return {
                isSuccessful: false,
                responseMessage: 'Failed to verify access token!',
                data: 'N/A'
              };
            }
          } else {
            // Load the data from the DB
            accessTokenInfo = {
              userId: '5f0866c8a4e8eee53c23bde5',
              permissions: {
                placeholderKey: 'placeholderValue'
              }
            };
          }

          const { userId, count, refreshTokenId } = refreshTokenPayload;

          // We'll check if the user with the provided `userId` had a
          // refresh token associated with their account with the
          // provided `refreshTokenId`
          const verifyRefreshTokenForUserId = true;
          // For this example let's say they did

          if (verifyRefreshTokenForUserId) {
            const { permissions } = accessTokenInfo;
            const accessToken = sign({ userId, permissions }, JWT_SECRET_KEY, {
              expiresIn: '15min'
            });

            const refreshTokenPayload = {
              userId,
              count,
              refreshTokenId
            };

            const refreshToken = sign(refreshTokenPayload, JWT_SECRET_KEY, {
              expiresIn: '30d'
            });

            res.cookie('refreshToken', refreshToken, {
              maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days in ms
              httpOnly: true
            });

            response = {
              isSuccessful: true,
              responseMessage:
                'Successfully refreshed access token and refresh token!',
              data: accessToken
            };
          } else {
            response = {
              isSuccessful: false,
              responseMessage: 'Failed to verify access token!',
              data: 'N/A'
            };
          }
        } else {
          response = {
            isSuccessful: false,
            responseMessage: 'Failed to verify access token!',
            data: 'N/A'
          };
        }

        return response;
      }
    },
    logout: {
      type: MutationResponseType,
      description: 'This endpoint is used to log out a user',
      args: {
        clientBrowserInfo: { type: GraphQLString }
      },
      resolve(parent, args, context) {
        logger('Logout payload', 'info', args);

        const { req, res } = context;
        // eslint-disable-next-line
        const clientIp = getIpAddress(req); //eslint-disable-line

        // Remove the `refreshToken` cookie
        res.cookie(`refreshToken`, '', {
          maxAge: 0
        });

        // Remove the `refreshToken` from user's document in the DB

        const response = {
          isSuccessful: true,
          responseMessage: 'Successfully logged out user!',
          data: 'N/A'
        };

        return response;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
