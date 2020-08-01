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

  it('Try to save Product data without a required field', async () => {
    let err;

    try {
      const validProductData = new ProductModel(sampleProductData);
      err = await validProductData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  // eslint-disable-next-line
  it("Try to insert Product data with extra data and check to see if the extra data was added (it shouldn't be added)", async () => {
    const productDataWithExtraInfo = {
      ...sampleProductData,
      extraInfo: 'Extra info placeholder'
    };

    const validProductData = new ProductModel(productDataWithExtraInfo);
    const savedProductData = await validProductData.save();

    expect(savedProductData._id).toBeDefined();
    expect(savedProductData.name).toBe(productDataWithExtraInfo.name);
    expect(savedProductData.productId.toString()).toBe(
      sampleProductData.productId
    );
    expect(savedProductData.description).toBe(
      productDataWithExtraInfo.description
    );
    expect(savedProductData.imageLinks).toEqual(
      productDataWithExtraInfo.imageLinks
    );

    expect(savedProductData.quantityType).toBe(
      productDataWithExtraInfo.quantityType
    );
    expect(savedProductData.averageRating).toBe(
      productDataWithExtraInfo.averageRating
    );
    expect(savedProductData.reviewCount).toBe(
      productDataWithExtraInfo.reviewCount
    );
    expect(savedProductData.category).toBe(productDataWithExtraInfo.category);
    expect(savedProductData.price).toBe(productDataWithExtraInfo.price);
    expect(savedProductData.brandName).toBe(productDataWithExtraInfo.brandName);
    expect(savedProductData.brandLogoLink).toBe(
      productDataWithExtraInfo.brandLogoLink
    );
    expect(savedProductData.discount).toBe(productDataWithExtraInfo.discount);
    expect(savedProductData.discountedPrice).toBe(
      productDataWithExtraInfo.discountedPrice
    );

    expect(savedProductData.createdAt).toBeDefined();
    expect(savedProductData.updatedAt).toBeDefined();

    // Here we'll check if the extraInfo got added or not
    expect(savedProductData.extraInfo).toBeUndefined();
  });

  // eslint-disable-next-line
  it('Check if Mongoose added the `createdAt` and `updatedAt` fields', async () => {
    const validProductData = new ProductModel(sampleProductData);
    const savedProductData = await validProductData.save();

    // Here we'll check if mongoose has set `createdAt` and `updatedAt` fields
    expect(savedProductData.createdAt).toBeDefined();
    expect(savedProductData.updatedAt).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
