'use strict';

const { model } = require('mongoose');

const bannerSchema = require('../../schemas/db/bannerSchema');

module.exports = model('Banner', bannerSchema);
