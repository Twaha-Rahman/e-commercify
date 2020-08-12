const mongoose = require('mongoose');

const ReviewModel = require('../../src/models/db/review');
const sampleReviewData = require('../../sample-data/sampleReviewData.json');

const reviewData = {
  ...sampleReviewData,
  linkedProductId: '5f0087003fb1953310f22b2e'
};

describe('Review Model Tests', () => {
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

  it('Should save valid Review data', async () => {
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

  it("Shouldn't save Review data without a required field", async () => {
    const invalidReviewData = new ReviewModel(sampleReviewData);
    const savedDocument = invalidReviewData.save();

    await expect(savedDocument).rejects.toBeInstanceOf(
      mongoose.Error.ValidationError
    );
  });

  // eslint-disable-next-line
  it("Shouldn't save Review data with a `rating` that is out of range (above maximum threshold)", async () => {
    const reviewDataCopy = JSON.parse(JSON.stringify(sampleReviewData));
    reviewDataCopy.rating = 6;

    const invalidReviewData = new ReviewModel(reviewDataCopy);
    const savedDocument = invalidReviewData.save();

    await expect(savedDocument).rejects.toBeInstanceOf(
      mongoose.Error.ValidationError
    );
  });

  // eslint-disable-next-line
  it("Shouldn't save Review data with a `rating` that is out of range (lower than minimum threshold)", async () => {
    const reviewDataCopy = JSON.parse(JSON.stringify(sampleReviewData));
    reviewDataCopy.rating = -1;

    const invalidReviewData = new ReviewModel(reviewDataCopy);
    const savedDocument = invalidReviewData.save();

    await expect(savedDocument).rejects.toBeInstanceOf(
      mongoose.Error.ValidationError
    );
  });

  // eslint-disable-next-line
  it("Shouldn't save data for fields that aren't defined in the schema", async () => {
    const reviewDataWithExtraInfo = {
      ...reviewData,
      extraInfo: 'Extra info placeholder'
    };

    const invalidReviewData = new ReviewModel(reviewDataWithExtraInfo);
    const savedReviewData = await invalidReviewData.save();

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

  it('Should add the `createdAt` and `updatedAt` fields', async () => {
    const validReviewData = new ReviewModel(reviewData);
    const savedReviewData = await validReviewData.save();

    // Here we'll check if mongoose has set `createdAt` and `updatedAt` fields
    expect(savedReviewData.createdAt).toBeDefined();
    expect(savedReviewData.updatedAt).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
