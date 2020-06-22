'use strict';

const graphql = require('graphql');

const ProductType = require('./graphql/ProductType');
const AddProductType = require('./graphql/AddProductType');
const BannerType = require('./graphql/BannerType');
const ReviewType = require('./graphql/ReviewType');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: ProductType,
      args: { productId: { type: GraphQLID } },
      resolve: (parent, args) => {
        // We'll receive the data here from the DB and return it.
        // For now we'll have some dummy data.
        return {
          productId: args.productId,
          name: 'Placeholder',
          imageLinks: ['...', '...', '...']
        };
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
      description: 'Read or write reviews objects',
      args: { linkedProductId: { type: GraphQLID } },
      resolve: () => {
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
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description:
    'This mutation endpoint is used to create, update or remove data.',
  fields: {
    addProduct: {
      type: AddProductType,
      description: 'This endpoint is used to add product data to the database.',
      args: {
        productData: { type: GraphQLString },
        dateAdded: { type: GraphQLString },
        userIdOfWhoAdded: { type: GraphQLID },
        clientInfo: { type: GraphQLString },
        ipAddress: { type: GraphQLString }
      },
      resolve(parent, args) {
        console.log(args);
        return {
          isSuccessfull: false,
          responseMessage: 'Product was successfully added to the database!'
        };
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
