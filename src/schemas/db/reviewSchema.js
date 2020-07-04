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
    type: Date,
    required: true
  },

  linkedProductId: ObjectID,

  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },

  userId: ObjectID
});

module.exports = reviewSchema;
