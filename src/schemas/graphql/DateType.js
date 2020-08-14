/**
 * @file DateType.js - Custom Date scalar type for GraphQL.
 *
 * Modified from https://www.graphql-tools.com/docs/scalars/#date-as-a-scalar
 */
'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

module.exports = new GraphQLScalarType({
  name: 'Date',
  description: 'Custom Date scalar type',
  /**
   * @param {number} value - The value received from the client.
   * @returns {Date}
   */
  parseValue(value) {
    return new Date(value);
  },
  /**
   * @param {Date} value - The date object which has to be serialized
   * before being sent to the client.
   * @returns {number}
   */
  serialize(value) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // 'ast.value' is always a string.
      return new Date(Number(ast.value));
    }
    return null;
  }
});
