# Social Network API

A RESTful API that mimicks a basic social network, allowing users to add friends, create thoughts, and react to thoughts. This API is built with express, node.js, and MongoDB, using the Mongoose wrapper. It follows the MVC paradigm.

https://user-images.githubusercontent.com/72160963/210501983-15117db1-904d-4a95-8227-9a26953184f7.mov

## License

[MIT](https://opensource.org/licenses/MIT)

## Table of Contents

- [Description](#description)
- [Models](#models)
  - [User](#user)
  - [Thought](#thought)
  - [Reaction](#reaction)
- [Deployment](#deployment)

## Models

### User

- `username` (string, unique, required, trimmed)
- `email` (string, required, unique, must match a valid email address)
- `thoughts` (array of `_id` values referencing the `Thought` model)
- `friends` (array of `_id` values referencing the `User` model)

#### Schema Settings

- Virtual field `friendCount` that retrieves the length of the user's `friends` array field on query.

### Thought

- `thoughtText` (string, required, between 1 and 280 characters)
- `createdAt` (date, default value set to current timestamp, getter method to format timestamp on query)
- `username` (string, required)
- `reactions` (array of nested documents created with the `reactionSchema`)

#### Schema Settings

- Virtual field `reactionCount` that retrieves the length of the thought's `reactions` array field on query.

### Reaction (SCHEMA ONLY)

- `reactionId` (Mongoose's ObjectId data type, default value set to new ObjectId)
- `reactionBody` (string, required, 280 character maximum)
- `username` (string, required)
- `createdAt` (date, default value set to current timestamp, getter method to format timestamp on query)

#### Schema Settings

- This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.

## Deployment

This API is deployed on [Heroku](https://www.heroku.com/).

## Author

-- Roman Sokol --
