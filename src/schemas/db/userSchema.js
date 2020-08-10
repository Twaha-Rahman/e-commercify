/**
 * @file userSchema.js - Mongoose schema for users.
 */
const { Schema } = require('mongoose');
const { ObjectID } = Schema.Types;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    },

    linkedCompanyId: {
      type: ObjectID
    },

    permissions: {
      read: {
        type: Boolean,
        default: false
      },
      write: {
        type: Boolean,
        default: false
      }
    },

    refreshToken: {
      type: String
    },

    userName: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = userSchema;
