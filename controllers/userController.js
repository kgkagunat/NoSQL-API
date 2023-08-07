const { User } = require('../models');

const userController = {

    // Get All Users
    async getAllUsers(req, res) {
        try {
            // Only Populate the `thoughts` field to access the Thought document
            const dbUserData = await User.find({})
                .populate('thoughts')
                .populate({
                    path: 'friends',
                    select: '_id username -_id'
                });
            // Iterate through the array of users
            const filteredUserData = dbUserData.map(user => {
                // Filter out the thoughts properties
                const thoughts = user.thoughts.map(thought => {
                    return {
                        _id: thought._id,
                        thoughtText: thought.thoughtText,
                        username: thought.username,
                    };
                })
                // Calculate friends count
                const friendCount = user.friends.length;

                // Using spread syntax, return new `user` object with the filtered `thoughts` and friendCount
                return { ...user._doc, thoughts, friendCount };
            });
            res.json(filteredUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single user
    async getUserById(req, res) {
        try {
            const dbUserData = await User.findById(req.params.id)
                .populate('thoughts').populate('friends');
            
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            // Filter out the thoughts properties
            const thoughts = dbUserData.thoughts.map(thought => {
                return {
                    _id: thought._id,
                    thoughtText: thought.thoughtText,
                    username: thought.username,
                };
            });

            const friends = dbUserData.friends.map(friend => {
                return {
                    _id: friend._id,
                    username: friend.username,
                    email: friend.email,
                };
            });

            // Get friend count
            const friendCount = dbUserData.friends.length;

            // Using spread syntax, return new `user` object with the filtered `thoughts` and `friends`, and `friendCount`
            const filteredUser = { ...dbUserData._doc, thoughts, friends, friendCount };

            res.json(filteredUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);

            res.status(200).json({ 
                status: 'success', 
                message: 'This USER has successfully been CREATED!', 
                data_CREATED: dbUserData 
            });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true });

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.status(200).json({ 
                status: 'success', 
                message: 'This USER has successfully been UPDATED!', 
                data_UPDATED: dbUserData 
            });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.id});

            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.status(200).json({ 
                status: 'success', 
                message: 'This USER has successfully been DELETED!', 
                data_DELETED: dbUserData 
            });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a new friend to a user's friends list
    async addFriend(req, res) {
        try {
            let dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true }
            );
    
            // Populate the friends field and re-save
            dbUserData = await User.populate(dbUserData, { path: "friends", select: 'username' });
    
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
    
            res.status(200).json({
                status:'success',
                message: 'This FRIEND has successfully been CREATED!',
                data_CREATED: dbUserData
            });
    
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a frined from a user's friends list
    async removeFriend(req, res) {
        try {
            let dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            
            // Populate the friends field and re-save
            dbUserData = await User.populate(dbUserData, { path: "friends", select: 'username' });
    
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
    
            res.status(200).json({
                status:'success',
                message: 'This FRIEND has successfully been DELETED!',
                data_DELETED: dbUserData
            });
            
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = userController;