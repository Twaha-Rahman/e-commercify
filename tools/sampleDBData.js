'use strict';

/**
 * @file Injects sample product data into MongoDB
 */

require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../src/models/db/product');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connection successful!');

  for (let i = 0; i < 500; i++) {
    const product = new Product({
      productName: 'Product',
      description: 'The only product we sell currently',
      productImageLinks: [
        'http://google.no/image.png',
        'https://bing.com/image.png'
      ],
      quantityType: 'things',
      averageRating: 4.9,
      reviewCount: 999,
      category: 'Good products',
      price: 1.99,
      brandName: 'Supreme',
      brandLogoLink:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Supreme_Logo.svg/576px-Supreme_Logo.svg.png',
      discounts: [
        {
          discountName: '90% discount',
          type: 'percentage',
          value: 90
        },
        {
          discountName: '2% discount',
          type: 'percentage',
          value: 2
        }
      ]
    });
    product.save().then(console.log).catch(console.log);
  }
});
