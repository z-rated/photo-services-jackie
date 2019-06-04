# Project Name

> Photos module for Zagat.com

## Related Projects

  - https://github.com/the-notorious-f-e-c/zagat-reviews
  - https://github.com/the-notorious-f-e-c/zagat-restaurant-info
  - https://github.com/the-notorious-f-e-c/zagat-google-reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> npm run seed to seed database (initial)
> npm run build to compile jsx files to one bundle
> npm run start 

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Crud Operations
Schema looks like:
{ 
  restaurantId: Number,
  name: String,
  photos: [String],
};

1. Get Request
-  Gets photos depending on relation of id to restaurantId.
- If successful, for http://localhost:3000/api/restaurants/:id/photos =
{
    "photos": [
        "https://s3.amazonaws.com/eugeniazagatphotos/iewp7uz5dg.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/ulwdgpe1c9.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/759pqo6xpf.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/slj1oezllk.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/s60zrdk6n5.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/zfh4h5ys9h.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/fcsfiuo0wr.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/h8zjgmdpe2.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/iaftp9hmio.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/myosl5h63n.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/clfdzqzfc0.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/bp2xgq6pxk.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/57wcegy6vf.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/o99jmq7zif.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/c6uenyp6u0.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/jfok8jx58n.jpg",
        "https://s3.amazonaws.com/eugeniazagatphotos/dc9vr741fp.jpg"
    ],
    "_id": "5cf5ee54e0466d45ca505266",
    "restaurantId": 1,
    "name": "Eleven Madison Park",
    "__v": 0
}

1. Post Request
https://localhost/3000/api/restaurants/:id/photos

- Post photos depending on relation of id to restaurantId.
- If successful the Post request will input an array of objects with the format of the schema. Should include a message indicating the post was successful.


1. Update Request
https://localhost/3000/api/restaurants/:id/photos

- Updates photos depending on relation of id to restaurantId.
- If update is successful, the Update request will modifiy one of the restaurants with a new array of photos.

1. Delete Request
https://localhost/3000/api/restaurants/:id/photos

- Deletes photo depending on relation of id to restaurantId. 
- If delete is successful, the Delete request will delete the selection of photos from specified restaurant.