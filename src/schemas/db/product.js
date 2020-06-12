const mongoose = require('mongoose');

const discount = require('./discount');

const productSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectID,
  productName: {
    type: String,
    required: true
  },
  description: String,
  productImageLinks: [
    {
      type: String,
      match:
        '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})',
      required: true
    }
  ],
  quantityType: {
    type: String,
    default: 'pieces'
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: Number,
  category: String,
  price: Number,
  brandName: String,
  brandLogoLink: {
    type: String,
    match:
      '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})'
  },
  discounts: [discount.schema]
  // TODO: Add storage info, such as SKU, quantity, size, weight etc.
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  model: Product,
  schema: productSchema
};
