# Social Network API

## Overview

This application is a Social Network API that was built using Express.js for routing, a MongoDB database, and the Mongoose ODM. The API allows users to perform CRUD operations on Users, Thoughts, and also manage Friend connections and Reactions on Thoughts.

## Challenges and Acceptance Criteria

The main challenge was to ensure proper relations between different models such as Users, Friends, Thoughts, and Reactions. 

The following acceptance criteria were met:

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Key Features

- Users can share their thoughts, react to friends' thoughts, and add friends to their friends list.
- Users and Thoughts can be created, read, updated, and deleted via the API.
- All the data is stored in a NoSQL database (MongoDB) which allows for flexible and fast data handling.

## Usage

To use this application, start by cloning the repo on your local machine. Install MongoDB on your machine. Use Insomnia or any other API client to test the API routes.

## Installation

1. Clone the repository
2. Install Node.js on your machine
3. Navigate to the root directory and run `npm install` to install the necessary dependencies
4. Ensure MongoDB is running on your machine
5. Populate the database with initial data by running `node utils/seeds.js`
6. Start the server by running `node index.js`

## License

This project is licensed under the MIT License.

## Video Walkthrough

https://github.com/kgkagunat/NoSQL-API-Social-Network/assets/127634764/cf44ffdd-2d60-4fa1-9a70-a7b1d44c922a

