const { User, Thought } = require('../models');

const userController = {

// create user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => {
            res.json(user)
        })
        .catch((err) => res.status(500).json(err));
    },

// get all Users
    getUsers(req, res) {
        User.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

// get single User
    findSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-__v')
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user with that ID exists."})
            } else {
                res
                .json(user)
                .status(200)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

// update a User
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: "No user with this ID, please try again."})
            } else {
                res
                .status(200)
                .json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

// delete a User
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No such user exists.'})
            } else {
                Thought.deleteMany({ _id: { $in: user.thoughts}})
            }
        })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err))
    },

// POST new user to friends array of a specific user /api/users/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId}},
            { new: true}
        )
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: 'No user with this ID exists.'})
            } else {
                res.status(200).json(user)
            }
        })
        .catch((err) => res.status(500).json(err));
    },

// DELETE request to remove friend. Endpoint will be /api/users/:userId/friends/:friendId
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId }},
            { new: true}
        )
        .then((friend) => {
            if (!friend) {
                res.status(404).json({ message: 'No user with this ID exists.'})
            } else {
                res.status(200).json(friend)
            }
        })
        .catch((err) => res.status(500).json(err));
    }

};

module.exports = userController;
