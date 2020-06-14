'use strict';

const { model } = require('mongoose');

const productSchema = require('../../schemas/db/productSchema');

module.exports = model('Product', productSchema);
