'use strict' /* eslint-disable */;

const sampleReviewData = require('../sample-data/sampleReviewData.json');

const mongoose = require('mongoose');
const ReviewModel = require('../src/models/db/review');

const reviewData = {
  ...sampleReviewData,
  linkedProductId: '5f0087003fb1953310f22b2e'
};

describe('Review Model Test', () => {
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

  it('Create & save valid Review data', async () => {
    const validReviewData = new ReviewModel(reviewData);
    const savedReviewData = await validReviewData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedReviewData._id).toBeDefined();
    expect(savedReviewData.comment).toBe(reviewData.comment);
    expect(savedReviewData.linkedProductId.toString()).toBe(
      reviewData.linkedProductId
    );
    expect(savedReviewData.rating).toBe(reviewData.rating);
    expect(savedReviewData.userId.toString()).toBe(reviewData.userId);
    expect(savedReviewData.createdAt).toBeDefined();
    expect(savedReviewData.updatedAt).toBeDefined();
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
