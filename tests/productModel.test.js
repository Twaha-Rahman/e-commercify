/* eslint-disable */

const mongoose = require('mongoose');

const ProductModel = require('../src/models/db/product');
const sampleProductData = require('../sample-data/sampleProductData.json');

describe('Product Model Tests', () => {
  // Connecting to MongoDB memory server
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it('Create & save valid Product data', async () => {
    const validProductData = new ProductModel(sampleProductData);
    const savedProductData = await validProductData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProductData._id).toBeDefined();
    expect(savedProductData.name).toBe(sampleProductData.name);
    expect(savedProductData.productId.toString()).toBe(
      sampleProductData.productId
    );
    expect(savedProductData.description).toBe(sampleProductData.description);
    expect(savedProductData.imageLinks).toEqual(sampleProductData.imageLinks);

    expect(savedProductData.quantityType).toBe(sampleProductData.quantityType);
    expect(savedProductData.averageRating).toBe(
      sampleProductData.averageRating
    );
    expect(savedProductData.reviewCount).toBe(sampleProductData.reviewCount);
    expect(savedProductData.category).toBe(sampleProductData.category);
    expect(savedProductData.price).toBe(sampleProductData.price);
    expect(savedProductData.brandName).toBe(sampleProductData.brandName);
    expect(savedProductData.brandLogoLink).toBe(
      sampleProductData.brandLogoLink
    );
    expect(savedProductData.discount).toBe(sampleProductData.discount);
    expect(savedProductData.discountedPrice).toBe(
      sampleProductData.discountedPrice
    );

    expect(savedProductData.createdAt).toBeDefined();
    expect(savedProductData.updatedAt).toBeDefined();
  });

  it('Try to save Review data without a required field', async () => {
    let err;

    try {
      const validReviewData = new ReviewModel(sampleReviewData);
      const savedReviewDataWithoutRequiredField = await validReviewData.save();
      err = savedReviewDataWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.linkedProductId).toBeDefined();
  });

  // eslint-disable-next-line
  it("Try to insert Review data with additional data and check to see if the additional data was added (it shouldn't be added)", async () => {
    const reviewDataWithExtraInfo = {
      ...reviewData,
      extraInfo: 'Extra info placeholder'
    };

    const validReviewData = new ReviewModel(reviewDataWithExtraInfo);
    const savedReviewData = await validReviewData.save();

    expect(savedReviewData._id).toBeDefined();
    expect(savedReviewData.comment).toBe(reviewData.comment);
    expect(savedReviewData.linkedProductId.toString()).toBe(
      reviewData.linkedProductId
    );
    expect(savedReviewData.rating).toBe(reviewData.rating);
    expect(savedReviewData.userId.toString()).toBe(reviewData.userId);
    expect(savedReviewData.createdAt).toBeDefined();
    expect(savedReviewData.updatedAt).toBeDefined();

    // Here we'll check if the extraInfo got added or not
    expect(savedReviewData.extraInfo).toBeUndefined();
  });

  // eslint-disable-next-line
  it('Check if Mongoose added the `createdAt` and `updatedAt` fields', async () => {
    const reviewDataWithExtraInfo = {
      ...reviewData,
      extraInfo: 'Extra info placeholder'
    };

    const validReviewData = new ReviewModel(reviewDataWithExtraInfo);
    const savedReviewData = await validReviewData.save();

    // Here we'll check if mongoose has set `createdAt` and `updatedAt` fields
    expect(savedReviewData.createdAt).toBeDefined();
    expect(savedReviewData.updatedAt).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
