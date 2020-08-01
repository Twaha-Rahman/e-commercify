/**
 * @file bannerSchema.js - Mongoose schema for banner objects.
 */

const { Schema } = require('mongoose');
const { ObjectId } = Schema.Types;

const bannerSchema = new Schema({
  bannerId: {
    type: ObjectId,
    required: true
  },
  dateAdded: {
    type: Number,
    required: true
  },
  bannerImageLink: {
    type: String,
    required: true
  },
  bannerGoToLink: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  },
  userIdOfWhoAdded: {
    type: ObjectId,
    required: true
  },
  clientBrowserInfo: {
    type: String,
    required: true
  },
  clientIpAddress: {
    type: String,
    required: true
  }
});

module.exports = bannerSchema;
