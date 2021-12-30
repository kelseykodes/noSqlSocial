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
      .then(({ _id }) => {
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
  // TODO: Add comments to the functionality of the updateApplication method
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.applicationId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((application) =>
        !application
          ? res.status(404).json({ message: 'No application with this id!' })
          : res.json(application)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // TODO: Add comments to the functionality of the deleteApplication method
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.id })
      .then((application) =>
        !application
          ? res.status(404).json({ message: 'No application with this id!' })
          : User.findOneAndUpdate(
              { applications: req.params.applicationId },
              { $pull: { applications: req.params.applicationId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Application created but no user with this id!',
            })
          : res.json({ message: 'Application successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: Add comments to the functionality of the addTag method
  createReaction(req, res) {
    Application.findOneAndUpdate(
      { _id: req.params.applicationId },
      { $addToSet: { tags: req.body } },
      { runValidators: true, new: true }
    )
      .then((application) =>
        !application
          ? res.status(404).json({ message: 'No application with this id!' })
          : res.json(application)
      )
      .catch((err) => res.status(500).json(err));
  },
  // TODO: Add comments to the functionality of the addTag method
  deleteReaction(req, res) {
    Application.findOneAndUpdate(
      { _id: req.params.applicationId },
      { $pull: { tags: { responseId: req.params.tagId } } },
      { runValidators: true, new: true }
    )
      .then((application) =>
        !application
          ? res.status(404).json({ message: 'No application with this id!' })
          : res.json(application)
      )
      .catch((err) => res.status(500).json(err));
  },
};
