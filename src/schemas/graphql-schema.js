'use strict';

const graphql = require('graphql');

const ProductType = require('./graphql/ProductType');
const MutationResponseType = require('./graphql/MutationResponseType');
const BannerType = require('./graphql/BannerType');
const ReviewType = require('./graphql/ReviewType');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLError
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      args: { productId: { type: GraphQLID } },
      resolve: (parent, args) => {
        // We'll receive the data here from the DB and return it.
        // For now we'll have some dummy data.
        // If no productId is provided the we'll return 15 products
        // If the productId is provided, then we'll return that product

        if (!args.productId) {
          return [
            {
              productId: args.productId,
              name: 'Placeholder',
              imageLinks: ['...', '...', '...']
            },
            {
              productId: args.productId,
              name: 'Placeholder',
              imageLinks: ['...', '...', '...']
            },
            {
              productId: args.productId,
              name: 'Placeholder',
              imageLinks: ['...', '...', '...']
            }
          ];
        } else {
          return [
            {
              productId: args.productId,
              name: 'Placeholder',
              imageLinks: ['...', '...', '...']
            }
          ];
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
      type: new GraphQLList(ReviewType),
      description: 'This endpoint is used to retrieve review objects',
      args: { linkedProductId: { type: GraphQLID } },
      resolve: (parent, args) => {
        if (!args.linkedProductId) {
          return new GraphQLError({
            message: 'Error: `linkedProductId` not provided!'
          });
        } else {
          return [
            {
              linkedProductId: '...',
              username: '...',
              userId: '...',
              profilePicture: '...',
              date: '...',
              comment: '...',
              rating: 5
            },
            {
              linkedProductId: '...',
              username: '...',
              userId: '...',
              profilePicture: '...',
              date: '...',
              comment: '...',
              rating: 5
            },
            {
              linkedProductId: '...',
              username: '...',
              userId: '...',
              profilePicture: '...',
              date: '...',
              comment: '...',
              rating: 5
            }
          ];
        }
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
        userToken: { type: GraphQLString },
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
          isSuccessfull: true,
          responseMessage: 'Product was successfully added!'
        };
      }
    },
    updateProduct: {
      type: MutationResponseType,
      description: 'This endpoint is used to update product data',
      args: {
        userToken: { type: GraphQLString },
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
          isSuccessfull: true,
          responseMessage: 'Product was successfully updated!'
        };
      }
    },
    deleteProduct: {
      type: MutationResponseType,
      description: 'This endpoint is used to delete product data',
      args: {
        userToken: { type: GraphQLString },
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
          isSuccessfull: true,
          responseMessage: 'Product was successfully deleted!'
        };
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});
