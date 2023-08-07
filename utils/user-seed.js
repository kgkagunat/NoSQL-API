const { User } = require('../models');

const userData = [
  {
    username: 'Rachel_Phillips',
    email: 'rachel_phillips1@example.com'
  },
  {
    username: 'Omar_Moore',
    email: 'Omoore_23@email.com'
  }
];

const seedUsers = () => User.insertMany(userData);

module.exports = seedUsers;
