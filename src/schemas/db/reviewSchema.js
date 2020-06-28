/**
 * @file reviewSchema.js - Mongoose schema for reviews.
 */
'use strict';

const { Schema } = require('mongoose');
const { ObjectID } = Schema.Types;

const reviewSchema = new Schema({
  comment: {
    type: String
  },

  date: {
    type: String,
    required: true
  },

  linkedProductId: {
    type: ObjectID,
    required: true
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },

  userId: {
    type: ObjectID,
    required: true
  }
});

module.exports = reviewSchema;
