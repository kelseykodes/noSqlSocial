const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((e) => res.status(500).json(e));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((e) => res.status(500).json(e));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(userData);
    })
    .catch(e => res.status(500).json(e));
},
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany (
            { username:  userData.username }
          )
      .then(() => res.json({ message: 'successfully deleted!' }))
      .catch((err) => res.status(500).json(err)));
    },
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        //
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((userData) =>
          !userData
            ? res.status(404).json({ message: 'wrong id!' })
            : res.json(userData)
        )
        .catch((e) => { console.log(e); res.status(500).json(e); });  
    },
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { reactions: { friends: req.params.friendId } }},
        { runValidators: true, new: true }
      )
        .then((friendData) =>
          !friendData
            ? res.status(404).json({ message: 'wrong id!' })
            : res.json(friendData)
        )
        .catch((e) => { console.log(e); res.status(500).json(e); });  
  },
};
