const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  discountId: mongoose.Schema.Types.ObjectID,
  discountName: {
    type: String,
    required: true
  },
  discountType: {
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
  // maxQuantity = 0 means unlimited
  maxQuantity: {
    type: Number,
    default: 0
  }
});

const Discount = mongoose.model('Discount', discountSchema);

module.exports = {
  model: Discount,
  schema: discountSchema
};
