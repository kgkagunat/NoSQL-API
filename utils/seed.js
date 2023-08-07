const seedUsers = require('./user-seed');
const seedThoughts = require('./thought-seed');
const db = require('../config/connection');
const { User, Thought } = require('../models');

db.once('open', async () => {
  // Clear existing data (used for testing purposes and re-seeding data)
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Seed new data
  await seedUsers();
  await seedThoughts();

  console.log('All seeds planted');
  process.exit(0);
});
