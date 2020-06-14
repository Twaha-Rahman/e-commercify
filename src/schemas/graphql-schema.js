const graphql = require('graphql');

const ProductType = require('./graphql/ProductType');
const BannerType = require('./graphql/BannerType');

const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    products: {
      type: ProductType,
      args: { productId: { type: GraphQLID } },
      resolve: (parent, args) => {
        // We'll recive the data here from DB and return it... for now we'll have some dummy data

        return {
          productId: args.productId,
          productName: 'Placeholder'
        };
      }
    },
    banners: {
      type: new GraphQLList(BannerType),
      description: 'Retrieves or updates the Banners',
      resolve: (parent, args) => {
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
