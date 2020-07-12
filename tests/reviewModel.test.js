'use strict' /* eslint-disable */;

const sampleReviewData = require('../sample-data/sampleReviewData.json');

const mongoose = require('mongoose');
const ReviewModel = require('../src/models/db/review');

const reviewData = {
  ...sampleReviewData,
  linkedProductId: '5f0087003fb1953310f22b2e'
};

describe('User Model Test', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
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

  it('Create & save valid Review data', async () => {
    const validReviewData = new ReviewModel(reviewData);
    const savedReviewData = await validReviewData.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedReviewData._id).toBeDefined();
    expect(savedReviewData.comment).toBe(reviewData.comment);
    expect(savedReviewData.date.toString()).toBe(
      'Thu Jul 02 2020 16:35:05 GMT+0600 (Bangladesh Standard Time)'
    );
    expect(savedReviewData.linkedProductId.toString()).toBe(
      reviewData.linkedProductId
    );
    expect(savedReviewData.rating).toBe(reviewData.rating);
    expect(savedReviewData.userId.toString()).toBe(reviewData.userId);
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

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it("Try to insert Review data with additional data and check to see if the additional data was added (it shouldn't be added)", async () => {
    const reviewDataWithExtraInfo = {
      ...reviewData,
      extraInfo: 'Extra info placeholder'
    };

    const validReviewData = new ReviewModel(reviewDataWithExtraInfo);
    const savedReviewData = await validReviewData.save();

    expect(savedReviewData._id).toBeDefined();
    expect(savedReviewData.comment).toBe(reviewData.comment);
    expect(savedReviewData.date.toString()).toBe(
      'Thu Jul 02 2020 16:35:05 GMT+0600 (Bangladesh Standard Time)'
    );
    expect(savedReviewData.linkedProductId.toString()).toBe(
      reviewData.linkedProductId
    );
    expect(savedReviewData.rating).toBe(reviewData.rating);
    expect(savedReviewData.userId.toString()).toBe(reviewData.userId);
    expect(savedReviewData.extraInfo).toBeUndefined();
  });
});
