## Backend API Structure

The backend API will have a GraphQL API endpoint for the project's frontend side of things. Each of the APIs will be used to send or receive data. The API will consist of five key parts -

- [Products](#products)
- [Banners](#banners)
- [Reviews](#Reviews)
- [Authenticate](#Authenticate)
- [Transaction](#transaction)
- [Analytics](#Analytics)

### Products

Any call to the `Products` API should return an array of product objects, where each product object will look like -

```js
{
    name: "Apple",
    description: "A fresh Apple for you!",
    productId: "y3u2uy32",
    productImageLinks: ['...', '...', '...'],
    quantityType: "kg",
    averageRating: 4.5,
    reviewCount: 34,
    category: "Fruits",
    price: "$4",
    brandName: "Green Foods",
    brandLogoLink: "https://....",
    discount: "2%",
    discountedPrice: "$3.69"
}
```

The mongoose schema looks like following:

```js
{
  productId: ObjectID,
  name: String,
  description: String,
  productImageLinks: [String],    (URL validation)
  quantityType: String,
  averageRating: Number,          (0-5 stars)
  reviewCount: Number,
  category: String,
  price: Number,
  brandName: String,
  brandLogoLink: [String],        (URL validation),
  discounts: [discountSchema]
}
```

`discounts` is an array of objects. They look like this:

(`maxQuantity = 0` should mean unlimited)

```js
{
  discountId: ObjectID,
  discountName: String,
  type: String  ['percentage', 'flat'],
  value: Number,
  minQuantity: Number,
  maxQuantity: Number
}
```

### Banners

Any call to the `Banners` API should return an array of banner objects, where each banner object will look like -

```js
{
    bannerImageLink: "...",
    bannerGoToLink: "...",
    text: "..."
}
```

### Reviews

Any call to the `Reviews` API should return an array of review objects, where each review object will look like -

```js
{
    linkedProductId: "...",
    username: "...",
    userId: "...",
    profilePicture: "...",
    date: "...",
    comment: "...",
    rating: 5
}
```

### Authenticate

The `Authenticate` API can be used to authenticate an user with or without third party OAuth (Twitter, Facebook etc). The details of this API haven't been nailed down yet.

### Transaction

The `Transaction` API will be used to handle user transactions. The details of this API haven't been nailed down yet.

It might be worth checking out [this page](https://stripe.com/docs/payments/checkout). It contains an example of Stripe-hosted secure checkout. Clone the "One time payment" example to see how it was done.

[Examples and flow charts](https://github.com/stripe-samples/checkout-one-time-payments/blob/master/README.md)

### Analytics

The `Analytics` API will be used to send and receive analytics data. The details of this API haven't been nailed down yet.
