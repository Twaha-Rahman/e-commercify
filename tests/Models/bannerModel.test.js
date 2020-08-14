'use strict';

const mongoose = require('mongoose');

const BannerModel = require('../../src/models/db/banner');
const sampleBannerData = require('../../sample-data/sampleBannerData.json');

const bannerData = {
  ...sampleBannerData,
  bannerId: new mongoose.Types.ObjectId()
};

describe('Banner Model Tests', () => {
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
    const validBannerData = new BannerModel(bannerData);
    const savedBannerData = await validBannerData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedBannerData._id).toBeDefined();
    expect(savedBannerData.bannerImageLink).toBe(bannerData.bannerImageLink);
    expect(savedBannerData.bannerGoToLink).toBe(bannerData.bannerGoToLink);
    expect(savedBannerData.text).toBe(bannerData.text);
    expect(savedBannerData.userIdOfWhoAdded.toString()).toBe(
      bannerData.userIdOfWhoAdded
    );
    expect(savedBannerData.clientBrowserInfo).toBe(
      bannerData.clientBrowserInfo
    );
    expect(savedBannerData.clientIpAddress).toBe(bannerData.clientIpAddress);
    expect(savedBannerData.createdAt).toBeDefined();
    expect(savedBannerData.updatedAt).toBeDefined();
  });

  it("Shouldn't save Banner data without a required field", async () => {
    const bannerDataWithoutARequiredField = JSON.parse(
      JSON.stringify(bannerData)
    );

    delete bannerDataWithoutARequiredField.bannerImageLink;

    const invalidBannerData = new BannerModel(bannerDataWithoutARequiredField);
    const savedDocument = invalidBannerData.save();

    await expect(savedDocument).rejects.toBeInstanceOf(
      mongoose.Error.ValidationError
    );
  });

  // eslint-disable-next-line
  it("Shouldn't save data for fields that aren't defined in the schema", async () => {
    const bannerDataWithExtraInfo = {
      ...bannerData,
      extraInfo: 'Extra info placeholder'
    };

    const invalidBannerData = new BannerModel(bannerDataWithExtraInfo);
    const savedBannerData = await invalidBannerData.save();

    expect(savedBannerData._id).toBeDefined();
    expect(savedBannerData.bannerImageLink).toBe(bannerData.bannerImageLink);
    expect(savedBannerData.bannerGoToLink).toBe(bannerData.bannerGoToLink);
    expect(savedBannerData.text).toBe(bannerData.text);
    expect(savedBannerData.userIdOfWhoAdded.toString()).toBe(
      bannerData.userIdOfWhoAdded
    );
    expect(savedBannerData.clientBrowserInfo).toBe(
      bannerData.clientBrowserInfo
    );
    expect(savedBannerData.clientIpAddress).toBe(bannerData.clientIpAddress);
    expect(savedBannerData.createdAt).toBeDefined();
    expect(savedBannerData.updatedAt).toBeDefined();

    // Here we'll check if the extraInfo got added or not
    expect(savedBannerData.extraInfo).toBeUndefined();
  });

  it('Should add the `createdAt` and `updatedAt` fields', async () => {
    const validBannerData = new BannerModel(bannerData);
    const savedBannerData = await validBannerData.save();

    // Here we'll check if mongoose has set `createdAt` and `updatedAt` fields
    expect(savedBannerData.createdAt).toBeDefined();
    expect(savedBannerData.updatedAt).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
