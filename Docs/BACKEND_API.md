## Backend API Structure

The backend API will have a GraphQL API endpoint for the project's frontend side of things. Each of the APIs will be used to send or recieve data. The API will consist of 5 key parts -

- [Products](#products)
- [Banners](#banners)
- [Reviews](#Reviews)
- [Authenticate](#Authenticate)
- [Transaction](#Transaction)
- [Analytics](#Analytics)

### Products

Any call to the `Products` API should return an array of products object, where each product object will look like -

```js
{
    productName: "Apple",
    description: "A fresh Apple for you!",
    productId: "y3u2uy32",
    quantityType: "kg",
    averageRating: 4.5,
    reviewCount: 34,
    catagory: "Fruits",
    price: "$4",
    brandName: "Green Foods",
    brandLogoLink: "https://....",
    discount: "2%",
    discountedPrice: "$3.69"
}
```

### Banners

Any call to the `Banners` API should return an array of banners object, where each banner object will look like -

```js
{
    bannerImageLink: "...",
    bannerGoToLink: "...",
    text: "...",
    CTA: "..."
}
```

### Reviews

Any call to the `Reviews` API should return an array of reviews object, where each review object will look like -

```js
{
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

The `Transaction` API will be used to handle user trancastions. The details of this API haven't been nailed down yet.

### Analytics

The `Analytics` API will be used to send and recieve analytics data. The details of this API haven't been nailed down yet.
