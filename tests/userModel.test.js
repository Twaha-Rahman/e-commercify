const mongoose = require('mongoose');

const User = require('../src/models/db/user');
const sampleUserData = require('../sample-data/sampleUserData.json');

const validUserData = JSON.parse(JSON.stringify(sampleUserData));

describe('User data validation', () => {
  it('should accept valid user data', async () => {
    const validUser = new User(validUserData);

    await expect(validUser.validate()).resolves.toBeUndefined();
  });

  // https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
  it.each(['email', 'password', 'userName'])(
    'should reject user data which has no `%s` field',
    async (field) => {
      const incompleteUserData = {
        ...validUserData,
        ...{ [field]: undefined }
      };
      const incompleteUser = new User(incompleteUserData);

      await expect(incompleteUser.validate()).rejects.toThrow(
        mongoose.Error.ValidationError
      );
    }
  );
});

describe('User data persistence', () => {
  beforeAll(() =>
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  );

  it('should include the value of every schema-defined field', async () => {
    expect.hasAssertions();
    const user = new User(validUserData);

    await user.save();

    const savedUser = await User.findOne({ _id: user._id });

    // Checks if the provided fields are unchanged.
    expect(savedUser.email).toBe(user.email);
    expect(savedUser.password).toBe(user.password);
    expect(savedUser.userName).toBe(user.userName);
  });

  it('should not include extra fields', async () => {
    expect.hasAssertions();
    const userDataWithExtraInfo = {
      ...validUserData,
      extraInfo: 'Extra info placeholder'
    };
    const userWithExtraInfo = new User(userDataWithExtraInfo);

    await userWithExtraInfo.save();

    const savedUser = await User.findOne({ _id: userWithExtraInfo._id });

    expect(savedUser).toBeTruthy();
    expect(savedUser.extraInfo).toBeUndefined();
  });

  it('should include optional fields', async () => {
    expect.hasAssertions();
    const userDataWithOptionalFields = {
      ...validUserData,
      linkedCompanyId: new mongoose.Types.ObjectId(),
      permissions: { read: true, write: true },
      refreshToken: 'fdb8fdbecf1d03ce5e6125c067733c0d51de222x'
    };
    const userWithOptionalFields = new User(userDataWithOptionalFields);

    await userWithOptionalFields.save();

    const savedUser = await User.findOne({ _id: userWithOptionalFields._id });

    expect(String(savedUser.linkedCompanyId)).toBe(
      String(userWithOptionalFields.linkedCompanyId)
    );
    /*
     * Cannot use `.toEqual()` to compare the two permissions objects directly
     *   as it throws an error.
     */
    expect(savedUser.permissions).toBeDefined();
    expect(savedUser.permissions.read).toBe(
      userWithOptionalFields.permissions.read
    );
    expect(savedUser.permissions.write).toEqual(
      userWithOptionalFields.permissions.write
    );
    expect(savedUser.refreshToken).toBe(userWithOptionalFields.refreshToken);
  });

  it('should include the `createdAt` and `updatedAt` fields', async () => {
    expect.hasAssertions();
    const validUser = new User(validUserData);

    const savedUser = await validUser.save();

    expect(savedUser.createdAt).toBeDefined();
    expect(savedUser.updatedAt).toBeDefined();
  });

  afterAll(() => mongoose.connection.close());
});
