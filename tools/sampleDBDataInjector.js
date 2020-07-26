'use strict';

/**
 * @file Injects sample product data into MongoDB
 */

require('dotenv').config();

const connectToMongoDb = require('../src/modules/connect-to-mongodb');
const logger = require('../src/modules/logger');
const cliArgumentParse = require('../src/modules/cli-argument-parse');

const Product = require('../src/models/db/product');
const Banner = require('../src/models/db/banner');
const Review = require('../src/models/db/review');

const sampleProductData = require('../sample-data/sampleProductData.json');
const sampleBannerData = require('../sample-data/sampleBannerData.json');
const sampleReviewData = require('../sample-data/sampleReviewData.json');
const { Types } = require('mongoose');

const args = cliArgumentParse();

(async function main() {
  await connectToMongoDb();

  if (args.keep !== true) {
    try {
      await Product.deleteMany();
      await Review.deleteMany();
      await Banner.deleteMany();

      logger('Deleted all previous sample data.\n', 'info');
    } catch (error) {
      logger(
        `An error occured while trying to delete previous sample data!\n\n`,
        'error',
        error
      );
    }
  } else {
    logger('Keeping all previous sample data.\n', 'info');
  }

  let errorObject;
  const productObjectIds = [];

  for (let i = 0; i < process.env.AMOUNT_OF_SAMPLE_PRODUCT_DATA; i++) {
    const product = new Product(sampleProductData);
    try {
      const addedProduct = await product.save();
      productObjectIds.push(addedProduct._id);
    } catch (error) {
      errorObject = error;
    }
  }

  for (let i = 0; i < process.env.AMOUNT_OF_SAMPLE_BANNER_DATA; i++) {
    const bannerData = { ...sampleBannerData, bannerId: new Types.ObjectId() };
    const banner = new Banner(bannerData);
    try {
      await banner.save();
    } catch (error) {
      errorObject = error;
    }
  }

  for (let i = 0; i < process.env.AMOUNT_OF_SAMPLE_PRODUCT_DATA; i++) {
    const newReview = {
      ...sampleReviewData,
      linkedProductId: productObjectIds[i]
    };

    for (
      let index = 0;
      index < process.env.AMOUNT_OF_SAMPLE_REVIEW_DATA;
      index++
    ) {
      const review = new Review(newReview);

      try {
        await review.save();
      } catch (error) {
        errorObject = error;
      }
    }
  }

  if (errorObject) {
    logger(
      'An error occured while trying to inject data into the database!\n\n',
      'setup',
      errorObject
    );
    process.exit(1);
  } else {
    logger('Successfully inserted sample data into the database!', 'success');
    process.exit(0);
  }
})();
