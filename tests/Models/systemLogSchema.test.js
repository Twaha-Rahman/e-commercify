const mongoose = require('mongoose');

const SystemLogModel = require('../../src/models/db/system-log');

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

  it('Should save valid SystemLog data (with optional fields)', async () => {
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
  it('Should save valid SystemLog data (without optional fields)', async () => {
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

  it("Should save valid SystemLog data with `level:'success'`", async () => {
    const systemLogWithSuccessTag = JSON.parse(
      JSON.stringify(sampleSystemLogWithoutOptionalFields)
    );
    systemLogWithSuccessTag.level = 'success';

    const validSystemLogData = new SystemLogModel(systemLogWithSuccessTag);
    const savedSystemLogData = await validSystemLogData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedSystemLogData._id).toBeDefined();
    expect(savedSystemLogData.message).toBe(
      sampleSystemLogWithoutOptionalFields.message
    );
    expect(savedSystemLogData.level).toBe(systemLogWithSuccessTag.level);

    expect(savedSystemLogData.createdAt).toBeDefined();
    expect(savedSystemLogData.updatedAt).toBeDefined();
  });

  it("Should save valid SystemLog data with `level:'error'`", async () => {
    const systemLogWithSuccessTag = JSON.parse(
      JSON.stringify(sampleSystemLogWithoutOptionalFields)
    );
    systemLogWithSuccessTag.level = 'error';

    const validSystemLogData = new SystemLogModel(systemLogWithSuccessTag);
    const savedSystemLogData = await validSystemLogData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedSystemLogData._id).toBeDefined();
    expect(savedSystemLogData.message).toBe(
      sampleSystemLogWithoutOptionalFields.message
    );
    expect(savedSystemLogData.level).toBe(systemLogWithSuccessTag.level);

    expect(savedSystemLogData.createdAt).toBeDefined();
    expect(savedSystemLogData.updatedAt).toBeDefined();
  });

  it("Should save valid SystemLog data with `level:'info'`", async () => {
    const systemLogWithSuccessTag = JSON.parse(
      JSON.stringify(sampleSystemLogWithoutOptionalFields)
    );
    systemLogWithSuccessTag.level = 'info';

    const validSystemLogData = new SystemLogModel(systemLogWithSuccessTag);
    const savedSystemLogData = await validSystemLogData.save();

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedSystemLogData._id).toBeDefined();
    expect(savedSystemLogData.message).toBe(
      sampleSystemLogWithoutOptionalFields.message
    );
    expect(savedSystemLogData.level).toBe(systemLogWithSuccessTag.level);

    expect(savedSystemLogData.createdAt).toBeDefined();
    expect(savedSystemLogData.updatedAt).toBeDefined();
  });

  it("Shouldn't save SystemLog data without a required field", async () => {
    const systemLogDataWithoutARequiredField = JSON.parse(
      JSON.stringify(sampleSystemLogWithoutOptionalFields)
    );
    delete systemLogDataWithoutARequiredField.level;

    const invalidSystemLogData = new SystemLogModel(
      systemLogDataWithoutARequiredField
    );
    const savedDocument = invalidSystemLogData.save();

    await expect(savedDocument).rejects.toBeInstanceOf(
      mongoose.Error.ValidationError
    );
  });

  // eslint-disable-next-line
  it("Shouldn't save data for fields that aren't defined in the schema", async () => {
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
  it('Should add the `createdAt` and `updatedAt` fields', async () => {
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
