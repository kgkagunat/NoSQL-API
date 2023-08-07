const { Thought, User } = require('../models');

const thoughtController = {

    // Get all thoughts
    async getAllThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find({});
            // Iterate through array of thoughts
            const filteredThoughtData = dbThoughtData.map(thought => {
                // Filter out the reactions properties
                const reactions = thought.reactions.map(reaction => {
                    return {
                        reactionBody: reaction.reactionBody,
                        username: reaction.username,
                        reactionId: reaction.reactionId,
                    };
                });
                // Using spread syntax, return new `thought` object with the filtered `reactions`
                return { ...thought._doc, reactions };
            });
            res.json(filteredThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a single thought by id
    async getThoughtById(req, res) {
        try {
            const dbThoughtData = await Thought.findOne({ _id: req.params.thoughtId })
                .populate('reactions');
                
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new thought
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);

            // Link the thought to the user
            await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
            
            res.status(200).json({
                status:'success',
                message: 'This THOUGHT has successfully been CREATED!',
                data_CREATED: dbThoughtData
            });

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new:true, runValidators: true });

            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.status(200).json({
                status:'success',
                message: 'This THOUGHT has successfully been UPDATED!',
                data_UPDATED: dbThoughtData
            });

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            
            res.status(200).json({
                status:'success',
                message: 'This THOUGHT has successfully been DELETED!',
                data_DELETED: dbThoughtData
            });
        
        } catch (err) {
            res.status(500).json(err);
        }
      },

      // Add a reaction to a thought
      async addReaction(req, res) {
        try {
            let dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true } 
            );

            // Populate the reactions field and re-save
            dbThoughtData = await Thought.populate(dbThoughtData, { path: "reactions" });

            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.status(200).json({
                status:'success',
                message: 'This REACTION has successfully been CREATED!',
                data_CREATED: dbThoughtData
            });

        } catch (err) {
            res.status(500).json(err);
        }
      },

      // Remove a reaction from a thought
      async removeReaction(req, res) {
        try {
            let dbThoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            // Populate the reactions field and re-save
            dbThoughtData = await Thought.populate(dbThoughtData, { path: "reactions" });

            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }

            res.status(200).json({
                status:'success',
                message: 'This REACTION has successfully been DELETED!',
                data_DELETED: dbThoughtData
            });

        } catch (err) {
            res.status(500).json(err);
        }
      },
};

module.exports = thoughtController;