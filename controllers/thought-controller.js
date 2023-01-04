const { Thought, User } = require('../models');

const thoughtController = {
// get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
// get thought by ID
    findSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID'})
            } else {
                res
                .status(200)
                .json(thought)
            }
        })
        .catch((err) => res.status(500).json(err));
    },
// create thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id}},
                    { new: true },
                )
            
            }).then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User does not exist'})
                } else {
                    res.status(200).json(user);
                }
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
// delete thought by ID
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: 'No thought with that ID'})
                } else {
                    User.deleteMany({
                        _id: { $in: thought.thoughts }
                    })
                }
            }
            )
            .then(() => res.json({ message: 'Thought deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

// update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body},
            { runValidators: true, new: true}
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({message: 'No such user exists.'})
            } else {
                res.status(200).json(thought)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

// post for reaction
    newReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body}},
            { new: true}
        )
        .then((reaction) => {
            if (!reaction) {
                res.status(404).json({ message: 'No thought with this ID exists.'})
            } else {
                res.status(200).json(reaction)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

// delete reaction via api/thoughts/:thoughtId/reaction/:reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId}} },
            { new: true}
        )
        .then((reaction) => {
            if (!reaction) {
                res.status(404).json({ message: 'No thought with this ID exists.'})
            } else {
                res.status(200).json(reaction)
            }
        })
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = thoughtController;
