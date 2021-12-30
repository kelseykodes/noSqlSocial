const { Thought, User } = require('../models');

module.exports = {
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .then(thoughtData => res.json(thoughtData))
    .catch(e => { console.log(e); res.status(400).json(e); });
  },
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then(thoughtData => {
        if (!thoughtData) {
           res.status(404).json({ message: 'wrong thought id!' });
           return;
        }
        res.json(thoughtData)
     })
      .catch((e) => { console.log(e); res.status(500).json(e); });
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then(thoughtData => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughtData._id } },
          { new: true }
        );
      })
      .then(userData => {
        if (!userData) {
           res.status(404).json({ message: 'wrong user id!' });
           return;
        }
        res.json(userData);
     })
    .catch((e) => { console.log(e); res.status(500).json(e); }); 
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body })
      .then((thoughtData) => 
        !thoughtData
          ? res.status(404).json({ message: 'wrong id!' })
          : res.json(thoughtData)
      )
    .catch((e) => { console.log(e); res.status(500).json(e); });   
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((deleteThought) =>
        !deleteThought
          ? res.status(404).json({ message: 'wrong id!' })
          : User.findOneAndUpdate(
              { username: deleteThought.username },
              { $pull: { thoughts: req.params.id } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'wrong user id!',
            })
          : res.json({ message: 'successfully deleted!' })
      )
      .catch((e) => { console.log(e); res.status(500).json(e); });  
  },
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      //could be $push
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thoughtData with this id!' })
          : res.json(thoughtData)
      )
      .catch((e) => { console.log(e); res.status(500).json(e); });  
  },
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } }},
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'wrong thought id!' })
          : res.json(thoughtData)
      )
      .catch((e) => { console.log(e); res.status(500).json(e); });  
  },
};
// module.exports = thoughtController;