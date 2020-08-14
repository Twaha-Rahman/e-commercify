'use strict';

const { model } = require('mongoose');

const reviewSchema = require('../../schemas/db/reviewSchema');

module.exports = model('Review', reviewSchema);
