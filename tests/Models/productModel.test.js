const mongoose = require('mongoose');

const ProductModel = require('../src/models/db/product');
// eslint-disable-next-line
const sampleProductDataWithOptionalFields = require('../sample-data/sampleProductData.json');

const sampleProductDataWithoutOptionalFields = JSON.parse(
  JSON.stringify(sampleProductDataWithOptionalFields)
);

// These are optional fields and we aren't saving them that's why
// they should be undefined
delete sampleProductDataWithoutOptionalFields.description;
delete sampleProductDataWithoutOptionalFields.discount;
delete sampleProductDataWithoutOptionalFields.discountedPrice;

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

  it('Create & save valid Product data (with optional fields)', async () => {
    const validProductData = new ProductModel(
      sampleProductDataWithOptionalFields
    );
    const savedProductData = await validProductData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProductData._id).toBeDefined();
    expect(savedProductData.name).toBe(
      sampleProductDataWithOptionalFields.name
    );
    expect(savedProductData.productId.toString()).toBe(
      sampleProductDataWithOptionalFields.productId
    );
    expect(savedProductData.description).toBe(
      sampleProductDataWithOptionalFields.description
    );

    const productImageLinksArray = Array.from(savedProductData.imageLinks);

    expect(productImageLinksArray).toEqual(
      sampleProductDataWithOptionalFields.imageLinks
    );

    expect(savedProductData.quantityType).toBe(
      sampleProductDataWithOptionalFields.quantityType
    );
    expect(savedProductData.averageRating).toBe(
      sampleProductDataWithOptionalFields.averageRating
    );
    expect(savedProductData.reviewCount).toBe(
      sampleProductDataWithOptionalFields.reviewCount
    );
    expect(savedProductData.category).toBe(
      sampleProductDataWithOptionalFields.category
    );
    expect(savedProductData.price).toBe(
      sampleProductDataWithOptionalFields.price
    );
    expect(savedProductData.brandName).toBe(
      sampleProductDataWithOptionalFields.brandName
    );
    expect(savedProductData.brandLogoLink).toBe(
      sampleProductDataWithOptionalFields.brandLogoLink
    );
    expect(savedProductData.discount).toBe(
      sampleProductDataWithOptionalFields.discount
    );
    expect(savedProductData.discountedPrice).toBe(
      sampleProductDataWithOptionalFields.discountedPrice
    );

    expect(savedProductData.createdAt).toBeDefined();
    expect(savedProductData.updatedAt).toBeDefined();
  });

  it('Create & save valid Product data (without optional fields)', async () => {
    const validProductData = new ProductModel(
      sampleProductDataWithoutOptionalFields
    );
    const savedProductData = await validProductData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProductData._id).toBeDefined();
    expect(savedProductData.name).toBe(
      sampleProductDataWithOptionalFields.name
    );
    expect(savedProductData.productId.toString()).toBe(
      sampleProductDataWithOptionalFields.productId
    );

    const productImageLinksArray = Array.from(savedProductData.imageLinks);

    expect(productImageLinksArray).toEqual(
      sampleProductDataWithOptionalFields.imageLinks
    );

    expect(savedProductData.quantityType).toBe(
      sampleProductDataWithOptionalFields.quantityType
    );
    expect(savedProductData.averageRating).toBe(
      sampleProductDataWithOptionalFields.averageRating
    );
    expect(savedProductData.reviewCount).toBe(
      sampleProductDataWithOptionalFields.reviewCount
    );
    expect(savedProductData.category).toBe(
      sampleProductDataWithOptionalFields.category
    );
    expect(savedProductData.price).toBe(
      sampleProductDataWithOptionalFields.price
    );
    expect(savedProductData.brandName).toBe(
      sampleProductDataWithOptionalFields.brandName
    );
    expect(savedProductData.brandLogoLink).toBe(
      sampleProductDataWithOptionalFields.brandLogoLink
    );

    expect(savedProductData.description).toBeUndefined();
    expect(savedProductData.discount).toBeUndefined();
    expect(savedProductData.discountedPrice).toBeUndefined();

    expect(savedProductData.createdAt).toBeDefined();
    expect(savedProductData.updatedAt).toBeDefined();
  });

  it('Try to save Product data without a required field', async () => {
    let err;

    const productDataWithoutARequiredField = JSON.parse(
      JSON.stringify(sampleProductDataWithOptionalFields)
    );
    delete productDataWithoutARequiredField.brandName;

    try {
      const invalidProductData = new ProductModel(
        productDataWithoutARequiredField
      );
      err = await invalidProductData.save();
      console.log(err);
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  // eslint-disable-next-line
  it("Try to insert Product data with extra data and check to see if the extra data was added (it shouldn't be added)", async () => {
    const productDataWithExtraInfo = {
      ...sampleProductDataWithOptionalFields,
      extraInfo: 'Extra info placeholder'
    };

    const invalidProductData = new ProductModel(productDataWithExtraInfo);
    const savedProductData = await invalidProductData.save();

    expect(savedProductData._id).toBeDefined();
    expect(savedProductData.name).toBe(productDataWithExtraInfo.name);
    expect(savedProductData.productId.toString()).toBe(
      sampleProductDataWithOptionalFields.productId
    );
    expect(savedProductData.description).toBe(
      productDataWithExtraInfo.description
    );

    const productImageLinksArray = Array.from(savedProductData.imageLinks);

    expect(productImageLinksArray).toEqual(productDataWithExtraInfo.imageLinks);

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
    const validProductData = new ProductModel(
      sampleProductDataWithOptionalFields
    );
    const savedProductData = await validProductData.save();

    // Here we'll check if mongoose has set `createdAt` and `updatedAt` fields
    expect(savedProductData.createdAt).toBeDefined();
    expect(savedProductData.updatedAt).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
