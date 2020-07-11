## Backend API Structure

The backend API will have a GraphQL API endpoint for the project's frontend side of things. Each of the APIs will be used to send or receive data. The API will consist of five key parts -

- [Products](#products)
  - [AddProduct](#addProduct)
  - [updateProduct](#updateProduct)
  - [deleteProduct](#deleteProduct)
- [Banners](#banners)
  - [AddBanner](#addBanner)
  - [DeleteBanner](#deleteBanner)
- [Reviews](#Reviews)
- [Authenticate](#Authenticate)
- [Transaction](#transaction)
- [Analytics](#Analytics)

_Please note that:_ All calls to any write API will need to have an `authToken` key. The value of the `authToken` key will be a JSON Web Token (or JWT in short).

### Products

Any call to the `Products` API should return an array of product objects, where each product object will look like -

```js
{
    name: "Apple",
    description: "A fresh Apple for you!",
    productId: "y3u2uy32",
    imageLinks: ['...', '...', '...'],
    quantityType: "kg",
    averageRating: 4.5,
    reviewCount: 34,
    category: "Fruits",
    price: 3.94,
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
  imageLinks: [String],    (URL validation)
  quantityType: String,
  averageRating: Number,          (0-5 stars)
  reviewCount: Number,
  category: String,
  price: Number,
  brandName: String,
  brandLogoLink: String,        (URL validation),
  discount: String,
  discountedPrice: String
}
```

The `discount` and `discountedPrice` values will be used for displaying disconts on various products. These will be calculated and managed by the brands/companies themselves.

![PNG - Discount Card Demo](DOC_IMG/discount-card-example.png)

#### AddProduct

The `AddProduct` endpoint will be used to add product info. A _sample request_ to
`AddProduct` endpoint will look like this -

```js
{
    authToken: 'sdfsdjfisd.dgshdfh.t43wgtw',
    productData: '{"name":"Apple","description":"A fresh Apple for you!",       "productId":"y3u2uy32","imageLinks":["...","...","..."],"quantityType":"kg","averageRating":4.5,"reviewCount":34,"category":"Fruits","price":3.94,"brandName":"Green Foods","brandLogoLink":"https://....","discount":"2%","discountedPrice":"$3.69"}',
    userIdOfWhoAdded: "asdas87ahc8a7as",
    clientBrowserInfo: '{"appName":"Netscape","appCodeName":"Mozilla","appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"}',
    clientIpAddress: '192.168.0.2'
}
```

In the above object, `productData` and `clientBrowserInfo` is in JSON. The `clientBrowserInfo` is collected from `navigator.appName`, `navigator.appCodeName` and `navigator.appVersion`.

A sample response from the API will look like this -

```js
    isSuccessful: true,
    responseMessage: 'Product was successfully added!'
```

#### UpdateProduct

The `UpdateProduct` endpoint will be used to update product info. A _sample request_ to
`UpdateProduct` endpoint will look like this -

```js
{
    authToken: 'sdfsdjfisd.dgshdfh.t43wgtw',
    productId: 'dfsdfu0sf8',
    infoToUpdate: '{"name":"Green Apple","brandLogoLink":"https://....","discount":"8%","discountedPrice":"$8.69"}',
    userIdOfWhoUpdated: "asdas87ahc8a7as",
    clientBrowserInfo: '{"appName":"Netscape","appCodeName":"Mozilla","appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"}',
    clientIpAddress: '192.168.0.2'
}
```

A sample response from the API will look like this -

```js
    isSuccessful: true,
    responseMessage: 'Product was successfully added!'
```

#### DeleteProduct

The `DeleteProduct` endpoint will be used to delete product info. A _sample request_ to
`DeleteProduct` endpoint will look like this -

```js
{
        authToken: 'sdfsdjfisd.dgshdfh.t43wgtw',
        productId: 'dfsdfu0sf8',
        userIdOfWhoDeleted: "asdas87ahc8a7as",
        clientBrowserInfo: '{"appName":"Netscape","appCodeName":"Mozilla","appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"}',
        clientIpAddress: '192.168.0.2'
}
```

A sample response from the API will look like this -

```js
    isSuccessful: true,
    responseMessage: 'Product was successfully added!'
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

#### AddBanner

The `AddBanner` endpoint will be used to add a banner info. A _sample request_ to
`AddBanner` endpoint will look like this -

```js
{
    authToken: "sdfsdjfisd.dgshdfh.t43wgtw", // JSON Web Token
    bannerData: '{"authToken":"dddd","bannerId":"5f0866c8a4e8eee53c23bdf3","userIdOfWhoDeleted":"fffsafsd","clientBrowserInfo":"fff","clientIpAddress":"sfsdfsd"}',
    clientBrowserInfo: '{"appName":"Netscape","appCodeName":"Mozilla","appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"}',
    clientIpAddress: '192.168.0.2'
}
```

#### DeleteBanner

The `DeleteBanner` endpoint will be used to delete a banner. A _sample request_ to
`DeleteBanner` endpoint will look like this -

```js
{
        authToken: 'sdfsdjfisd.dgshdfh.t43wgtw', // JSON Web Token
        productId: 'dfsdfu0sf8',
        clientBrowserInfo: '{"appName":"Netscape","appCodeName":"Mozilla","appVersion":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"}',
        clientIpAddress: '192.168.0.2'
}
```

### Reviews

Any call to the `Reviews` API should return an array of review objects, where each review object will look like -

```js
{
    linkedProductId: "...",
    userId: "...",
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
