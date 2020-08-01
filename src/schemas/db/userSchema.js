'use strict';

const { Schema } = require('mongoose');

const bannerSchema = new Schema(
  {
    userName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    linkedCompany: {
      type: Schema.Types.Mixed,
      required: false
    },
    associatedRefreshTokens: {
      type: Schema.Types.Mixed,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = bannerSchema;
