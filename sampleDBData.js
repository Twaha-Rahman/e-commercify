/**
 * @file Injects sample product data into MongoDB
 */
'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/db/product');

if (typeof process.env.MONGO_URL !== 'string') {
  console.error('Error: the MONGO_URL environment variable is not set.');
  process.exit(1);
}

const chooseRandomInteger = (min, max) => {
  return min + Math.floor(Math.random() * max);
};

// Will be used later to generate random discount objects.
/* eslint-disable-next-line no-unused-vars */
const chooseRandomPercentage = () => {
  return `${chooseRandomInteger(1, 99)}%`;
};

const chooseRandomPrice = () => {
  return chooseRandomInteger(1, 9999) / 100;
};

const chooseRandomRating = () => {
  return chooseRandomInteger(0, 10) / 2;
};

const createRandomProduct = () => {
  return new Product({
    name: 'Product',
    description: 'The only product we sell currently',
    productImageLinks: [
      'http://google.no/image.png',
      'https://bing.com/image.png'
    ],
    quantityType: 'things',
    averageRating: chooseRandomRating(),
    reviewCount: chooseRandomInteger(0, 999),
    category: 'Good products',
    price: chooseRandomPrice(),
    brandName: 'Supreme',
    brandLogoLink:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Supreme_Logo.svg/576px-Supreme_Logo.svg.png',
    discounts: [
      {
        name: '90% discount',
        type: 'percentage',
        value: 90
      },
      {
        name: '2% discount',
        type: 'percentage',
        value: 2
      }
    ]
  });
};

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection successful!');
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB!', error);
    process.exit(1);
  })
  .then(() => {
    const products = [];

    for (let i = 0; i < 500; i++) {
      products[i] = createRandomProduct();
    }
    return products;
  })
  .then((products) => {
    return Product.insertMany(products);
  })
  .then((docs) => {
    console.log('Success: all %s objects were inserted.', docs.length);
  })
  .catch((error) => {
    console.error('Could not insert all objects into the database', error);
    process.exitCode = 1;
  })
  .then(() => {
    mongoose.connection.close();
  });
