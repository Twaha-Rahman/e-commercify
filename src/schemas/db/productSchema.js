const { Schema } = require('mongoose');

const productSchema = new Schema({
  productId: Schema.Types.ObjectID,
  name: {
    type: String,
    required: true
  },
  description: String,

  // Write regex that'll check for the right file extensions for `imageLinks`
  imageLinks: [
    {
      type: String,
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
  price: {
    type: Number,
    required: true
  },
  brandName: String,
  brandLogoLink: {
    type: String
  },
  discount: String,
  discountedPrice: String
});

module.exports = productSchema;
