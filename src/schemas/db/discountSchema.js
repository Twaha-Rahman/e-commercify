'use strict';

const { Schema } = require('mongoose');

const discountSchema = new Schema({
  discountId: Schema.Types.ObjectID,
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['percentage', 'flat'],
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  minQuantity: {
    type: Number,
    default: 0
  },
  maxQuantity: {
    type: Number,
    default: 0
  }
});

module.exports = discountSchema;
