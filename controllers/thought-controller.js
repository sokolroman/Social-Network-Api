const { Thought, User } = require('../models');

const thoughtController = {
// get all thoughts
async getThoughts(req, res) {
try {
const thoughts = await Thought.find();
return res.json(thoughts);
} catch (err) {
return res.status(500).json(err);
}
},
// get thought by ID
async findSingleThought(req, res) {
try {
const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
if (!thought) {
return res.status(404).json({ message: 'No thought with that ID' });
} else {
return res.status(200).json(thought);
}
} catch (err) {
return res.status(500).json(err);
}
},
// create thought
async createThought(req, res) {
try {
const thought = await Thought.create(req.body);
const user = await User.findOneAndUpdate(
{ _id: req.body.userId },
{ $addToSet: { thoughts: thought._id } },
{ new: true }
);
if (!user) {
return res.status(404).json({ message: 'User does not exist' });
} else {
return res.status(200).json(user);
}
} catch (err) {
console.log(err);
return res.status(500).json(err);
}
},
// delete thought by ID
async deleteThought(req, res) {
try {
const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
if (!thought) {
return res.status(404).json({ message: 'No thought with that ID' });
} else {
await User.deleteMany({ _id: { $in: thought.thoughts } });
}
return res.json({ message: 'Thought deleted!' });
} catch (err) {
return res.status(500).json(err);
}
},

// update thought
async updateThought(req, res) {
try {
const thought = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ $set: req.body },
{ runValidators: true, new: true }
);
if (!thought) {
return res.status(404).json({ message: 'No such user exists.' });
} else {
return res.status(200).json(thought);
}
} catch (err) {
return res.status(500).json(err);
}
},

// post for reaction
async newReaction(req, res) {
try {
const reaction = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ $addToSet: { reactions: req.body } },
{ new: true }
);
if (!reaction) {
return res.status
(404).json({ message: 'No thought with this ID exists.'});
}
return res.status(200).json(reaction);
} catch (err) {
return res.status(500).json(err);
}
},

// delete reaction via api/thoughts/:thoughtId/reaction/:reactionId
async deleteReaction(req, res) {
try {
const reaction = await Thought.findOneAndUpdate(
{ _id: req.params.thoughtId },
{ $pull: { reactions: { reactionId: req.params.reactionId } } },
{ new: true }
);
if (!reaction) {
return res.status(404).json({ message: 'No thought with this ID exists.'});
}
return res.status(200).json(reaction);
} catch (err) {
return res.status(500).json(err);
}
}
};

module.exports = thoughtController;

