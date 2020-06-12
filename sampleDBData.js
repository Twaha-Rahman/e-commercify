require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./src/schemas/db/product');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

// TODO: Make error handler (not that necessary)

db.once('open', function () {
  console.log('Connection successful!');

  /*const fakeProducts = [
    {
      productName: 'Very nice product',
      description: 'You won\'t regret buying this',
      quantityType: 'Things',
      averageRating: 5,
      reviewCount: 999,
      category: 'Great things',
      price: 1.99,
      brandName: 'Supreme',
      brandLogoLink: 'no',
      discount: 0,
      discountedPrice: Math.random()
    },
    {
      productName: 'Not a great product',
      description: 'Buy this at your own risk',
      quantityType: 'regrets',
      averageRating: 1.2,
      reviewCount: 12,
      category: 'Bad things',
      price: 13.99,
      brandName: 'Gccui',
      brandLogoLink: 'fake',
      discount: 12.5,
      discountedPrice: Math.random()
    }
  ];*/

  // TODO: Make a bigger variety of fake products

  for (let i = 0; i < 10000; i++) {
    let product = new Product.model({
      productName: 'Good product',
      description: 'It is very good indeed',
      productImageLinks: ['http://google.no', 'https://bing.com'],
      quantityType: 'things',
      averageRating: 4.9,
      reviewCount: 999,
      category: 'Good products',
      price: 1.99,
      brandName: 'Supreme',
      brandLogoLink: 'https://supreme.com',
      discounts: [
        {
          discountName: 'Discount for nice children',
          discountType: 'percentage',
          value: 90
        },
        {
          discountName: 'Discount for bad children',
          discountType: 'percentage',
          value: 2
        }
      ]
    });

    Product.model.collection.insertOne(product, function (err, docs) {
      if (err) {
        return console.log(err);
      }
      console.log(docs);
    });
  }
});
