'use strict';

const { model } = require('mongoose');

const discountSchema = require('../../schemas/db/discountSchema');

module.exports = model('Discount', discountSchema);
