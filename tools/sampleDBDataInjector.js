'use strict';

/**
 * @file Injects sample product data into MongoDB
 */

require('dotenv').config();

const { ArgumentParser } = require('argparse');
const connectToMongoDb = require('../src/connect-to-mongodb');
const Product = require('../src/models/db/product');
const Banner = require('../src/models/db/banner');
const Review = require('../src/models/db/review');

const sampleProductData = require('../sample-data/sampleProductData.json');
const sampleBannerData = require('../sample-data/sampleBannerData.json');
const sampleReviewData = require('../sample-data/sampleReviewData.json');
const { Types } = require('mongoose');

const args = (() => {
  const parser = new ArgumentParser({
    addHelp: true,
    description: 'Inserts random product data into MongoDB.'
  });

  parser.addArgument(['-k', '--keep'], {
    action: 'storeTrue',
    help: 'Do not delete already existing product documents.'
  });
  return parser.parseArgs();
})();

(async function main() {
  await connectToMongoDb();

  if (args.keep !== true) {
    try {
      await Product.deleteMany();
      await Review.deleteMany();
      await Banner.deleteMany();
      console.log(`Deleted all previous sample data.\n`);
    } catch (error) {
      console.error(
        'An error occured while trying to delete previous sample data!\n\n',
        error
      );
    }
  } else {
    console.log(`Keeping all previous sample data.\n`);
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
    console.error(
      'An error occured while trying to inject data into the database!\n\n',
      errorObject
    );
  } else {
    console.log(`Successfully inserted sample data into the database!`);
  }

  process.exit();
})();
