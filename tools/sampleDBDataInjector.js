'use strict';

/**
 * @file Injects sample product data into MongoDB
 */

require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../src/models/db/product');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', async () => {
  console.log('\nConnection successful!\n');

  let errorObject;

  for (let i = 0; i < process.env.AMOUNT_OF_SAMPLE_PRODUCT_DATA; i++) {
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
    try {
      await product.save();
    } catch (error) {
      errorObject = error;
    }
  }

  if (errorObject) {
    console.error(
      'An error occured while trying to inject data into the database!\n\n',
      errorObject
    );
  } else {
    console.log(
      `Successfully inserted ${process.env.AMOUNT_OF_SAMPLE_PRODUCT_DATA}` +
        ` sample product data into the database!`
    );
  }

  process.exit();
});
