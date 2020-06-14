const mongoose = require('mongoose');

const discountSchema = require('../../schemas/db/discountSchema');

module.exports = mongoose.model('Discount', discountSchema);
