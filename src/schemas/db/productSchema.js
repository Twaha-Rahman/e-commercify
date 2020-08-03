const { Schema } = require('mongoose');

const productSchema = new Schema(
  {
    productId: Schema.Types.ObjectID,
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },

    // Write regex that'll check for the right file extensions for `imageLinks`
    imageLinks: [
      {
        type: String,
        required: true
      }
    ],
    quantityType: {
      type: String,
      required: true
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    reviewCount: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    brandName: {
      type: String,
      required: true
    },
    brandLogoLink: {
      type: String,
      required: true
    },
    discount: {
      type: String,
      required: false
    },
    discountedPrice: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = productSchema;
