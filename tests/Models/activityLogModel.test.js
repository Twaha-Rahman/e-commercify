const mongoose = require('mongoose');

const ActivityModel = require('../../src/models/db/activity');

const sampleActivityWithOptionalFields = {
  userId: new mongoose.Types.ObjectId().toString(),
  linkedCompanyId: new mongoose.Types.ObjectId().toString(),
  clientBrowserInfo:
    '{"appName":"Netscape","appCodeName":"Mozilla","appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"}', // eslint-disable-line
  clientIpAddress: '192.168.0.1'
};

const sampleActivityWithoutOptionalFiels = {
  userId: new mongoose.Types.ObjectId(),
  linkedCompanyId: new mongoose.Types.ObjectId()
};

describe('Activity Model Tests', () => {
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

  it('Should save valid Activity data (with optional fields)', async () => {
    const validActivityData = new ActivityModel(
      sampleActivityWithOptionalFields
    );
    const savedActivityData = await validActivityData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedActivityData._id).toBeDefined();
    expect(savedActivityData.userId.toString()).toBe(
      sampleActivityWithOptionalFields.userId
    );
    expect(savedActivityData.linkedCompanyId.toString()).toBe(
      sampleActivityWithOptionalFields.linkedCompanyId
    );

    expect(savedActivityData.clientBrowserInfo).toBe(
      sampleActivityWithOptionalFields.clientBrowserInfo
    );
    expect(savedActivityData.clientIpAddress).toBe(
      sampleActivityWithOptionalFields.clientIpAddress
    );

    expect(savedActivityData.createdAt).toBeDefined();
    expect(savedActivityData.updatedAt).toBeDefined();
  });

  // eslint-disable-next-line
  it('Should save valid Activity data (without optional fields)', async () => {
    const validActivityData = new ActivityModel(
      sampleActivityWithOptionalFields
    );
    const savedActivityData = await validActivityData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedActivityData._id).toBeDefined();
    expect(savedActivityData.userId.toString()).toBe(
      sampleActivityWithOptionalFields.userId
    );
    expect(savedActivityData.linkedCompanyId.toString()).toBe(
      sampleActivityWithOptionalFields.linkedCompanyId
    );

    expect(savedActivityData.createdAt).toBeDefined();
    expect(savedActivityData.updatedAt).toBeDefined();
  });

  it("Shouldn't save Activity data without a required field", async () => {
    const activityDataWithoutARequiredField = JSON.parse(
      JSON.stringify(sampleActivityWithoutOptionalFiels)
    );
    delete activityDataWithoutARequiredField.linkedCompanyId;

    const invalidActivityData = new ActivityModel(
      activityDataWithoutARequiredField
    );
    const savedDocument = invalidActivityData.save();

    await expect(savedDocument).rejects.toBeInstanceOf(
      mongoose.Error.ValidationError
    );
  });

  // eslint-disable-next-line
  it("Shouldn't save data for fields that aren't defined in the schema", async () => {
    const activityDataWithExtraInfo = {
      ...sampleActivityWithOptionalFields,
      extraInfo: 'Extra info placeholder'
    };

    const invalidActivityDocument = new ActivityModel(
      activityDataWithExtraInfo
    );
    const savedActivityData = await invalidActivityDocument.save();

    expect(savedActivityData._id).toBeDefined();
    expect(savedActivityData.userId.toString()).toBe(
      sampleActivityWithOptionalFields.userId
    );
    expect(savedActivityData.linkedCompanyId.toString()).toBe(
      sampleActivityWithOptionalFields.linkedCompanyId
    );

    expect(savedActivityData.clientBrowserInfo).toBe(
      sampleActivityWithOptionalFields.clientBrowserInfo
    );
    expect(savedActivityData.clientIpAddress).toBe(
      sampleActivityWithOptionalFields.clientIpAddress
    );

    expect(savedActivityData.createdAt).toBeDefined();
    expect(savedActivityData.updatedAt).toBeDefined();

    // Here we'll check if the extraInfo got added or not
    expect(savedActivityData.extraInfo).toBeUndefined();
  });

  it('Should add the `createdAt` and `updatedAt` fields', async () => {
    const validActivityData = new ActivityModel(
      sampleActivityWithoutOptionalFiels
    );
    const savedActivityData = await validActivityData.save();

    // Here we'll check if mongoose has set `createdAt` and `updatedAt` fields
    expect(savedActivityData.createdAt).toBeDefined();
    expect(savedActivityData.updatedAt).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
