const productSchema = require('../../schemas/db/productSchema');

module.exports = mongoose.model('Product', productSchema);
