'use strict';

const mongoose = require('mongoose');

const SystemLogModel = require('../src/models/db/system-log');

const sampleSystemLogWithOptionalFields = {
  message: 'Something went horribly wrong! :(',
  level: 'error',
  additionalData: '{"message":"Shit! Summoned Cathulu!"}'
};

const sampleSystemLogWithoutOptionalFields = {
  message: 'Something went horribly wrong! :(',
  level: 'error'
};

describe('SystemLog Model Tests', () => {
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

  it('Create & save valid SystemLog data (with optional fields)', async () => {
    const validSystemLogData = new SystemLogModel(
      sampleSystemLogWithOptionalFields
    );
    const savedSystemLogData = await validSystemLogData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedSystemLogData._id).toBeDefined();
    expect(savedSystemLogData.message).toBe(
      sampleSystemLogWithOptionalFields.message
    );
    expect(savedSystemLogData.level).toBe(
      sampleSystemLogWithOptionalFields.level
    );

    expect(savedSystemLogData.additionalData).toBe(
      sampleSystemLogWithOptionalFields.additionalData
    );

    expect(savedSystemLogData.createdAt).toBeDefined();
    expect(savedSystemLogData.updatedAt).toBeDefined();
  });

  // eslint-disable-next-line
  it('Create & save valid SystemLog data (without optional fields)', async () => {
    const validSystemLogData = new SystemLogModel(
      sampleSystemLogWithoutOptionalFields
    );
    const savedSystemLogData = await validSystemLogData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedSystemLogData._id).toBeDefined();
    expect(savedSystemLogData.message).toBe(
      sampleSystemLogWithoutOptionalFields.message
    );
    expect(savedSystemLogData.level).toBe(
      sampleSystemLogWithoutOptionalFields.level
    );

    expect(savedSystemLogData.createdAt).toBeDefined();
    expect(savedSystemLogData.updatedAt).toBeDefined();
  });

  it('Try to save SystemLog data without a required field', async () => {
    let err;

    const systemLogDataWithoutARequiredField = JSON.parse(
      JSON.stringify(sampleSystemLogWithoutOptionalFields)
    );
    delete systemLogDataWithoutARequiredField.level;

    try {
      const invalidSystemLogData = new SystemLogModel(
        systemLogDataWithoutARequiredField
      );
      err = await invalidSystemLogData.save();
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  // eslint-disable-next-line
  it("Try to insert Activity data with extra data and check to see if the extra data was added (it shouldn't be added)", async () => {
    const systemLogWithExtraInfo = {
      ...sampleSystemLogWithOptionalFields,
      extraInfo: 'Extra info placeholder'
    };

    const invalidSystemLogDocument = new SystemLogModel(systemLogWithExtraInfo);
    const savedSystemLogData = await invalidSystemLogDocument.save();

    expect(savedSystemLogData._id).toBeDefined();
    expect(savedSystemLogData.message).toBe(systemLogWithExtraInfo.message);
    expect(savedSystemLogData.level).toBe(systemLogWithExtraInfo.level);

    expect(savedSystemLogData.additionalData).toBe(
      systemLogWithExtraInfo.additionalData
    );

    expect(savedSystemLogData.createdAt).toBeDefined();
    expect(savedSystemLogData.updatedAt).toBeDefined();

    // Here we'll check if the extraInfo got added or not
    expect(savedSystemLogData.extraInfo).toBeUndefined();
  });

  // eslint-disable-next-line
  it('Check if Mongoose added the `createdAt` and `updatedAt` fields', async () => {
    const validSystemLogData = new SystemLogModel(
      sampleSystemLogWithoutOptionalFields
    );
    const savedSystemLogData = await validSystemLogData.save();

    // Here we'll check if mongoose has set `createdAt` and `updatedAt` fields
    expect(savedSystemLogData.createdAt).toBeDefined();
    expect(savedSystemLogData.updatedAt).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
