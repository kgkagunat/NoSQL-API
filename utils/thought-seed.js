const { Thought } = require('../models');
const { User } = require('../models');

const seedThoughts = async () => {
  const users = await User.find({});

  const thoughtData = [
    {
      thoughtText: 'I like to think about coding and learning new things',
      username: users[0].username
    },
    {
      thoughtText: 'I enjoy the challenges of coding.',
      username: users[1].username
    }
  ];

  const thoughts = await Thought.insertMany(thoughtData);

  // Update the users with the new thoughts
  await User.findByIdAndUpdate(users[0]._id, { $push: { thoughts: thoughts[0]._id } });
  await User.findByIdAndUpdate(users[1]._id, { $push: { thoughts: thoughts[1]._id } });

  return thoughts;
};


module.exports = seedThoughts;
