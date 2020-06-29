'use strict';

const { Schema } = require('mongoose');

const bannerSchema = new Schema({
  bannerImageLink: {
    type: String,
    required: true
  },
  bannerGoToLink: {
    type: String,
    required: true
  },
  text: String
});

module.exports = bannerSchema;
