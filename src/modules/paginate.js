/**
 * @file paginate.js - Pagination feature for Mongoose queries.
 */
'use strict';

const { GraphQLError } = require('graphql');

const defaultItemsPerPage = Number(process.env.DEFAULT_ITEMS_PER_PAGE);
const maxItemsPerPage = Number(process.env.MAX_ITEMS_PER_PAGE);

/**
 * Wraps the given Mongoose query expression according to the given options.
 *
 * @param {mongoose.Query} query
 * @param {object} options
 * @param {number} options.itemsPerPage
 * @param {number} options.page
 */
function paginate(
  query,
  { itemsPerPage = defaultItemsPerPage, page = 1 } = {}
) {
  if (itemsPerPage > maxItemsPerPage) {
    throw new GraphQLError(
      `Cannot serve more than ${maxItemsPerPage} items per page.`
    );
  }
  if (itemsPerPage < 1) {
    throw new GraphQLError('Argument `itemsPerPage` must be greater than 0.');
  }
  if (page < 1) {
    throw new GraphQLError('Argument `page` must be greater than 0.');
  }

  const numberOfItemsToSkip = itemsPerPage * (page - 1);

  return query.skip(numberOfItemsToSkip).limit(itemsPerPage);
}

module.exports = paginate;
