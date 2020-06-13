const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  discountId: mongoose.Schema.Types.ObjectID,
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
