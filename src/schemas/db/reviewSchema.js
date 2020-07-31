/**
 * @file reviewSchema.js - Mongoose schema for reviews.
 */

const { Schema } = require('mongoose');
const { ObjectID } = Schema.Types;

const reviewSchema = new Schema(
  {
    comment: {
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
  },
  { timestamps: true }
);

module.exports = reviewSchema;
