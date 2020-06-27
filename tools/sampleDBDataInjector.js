'use strict';

/**
 * @file Injects sample product data into MongoDB
 */

require('dotenv').config();

const connectToMongoDb = require('../src/connect-to-mongodb');
const Product = require('../src/models/db/product');
const sampleProductData = require('../sample-data/sampleProductData.json');

(async function main() {
  await connectToMongoDb();

  let errorObject;

  for (let i = 0; i < process.env.AMOUNT_OF_SAMPLE_PRODUCT_DATA; i++) {
    const product = new Product(sampleProductData);
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
})();
