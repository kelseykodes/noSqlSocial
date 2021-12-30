const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((e) => res.status(500).json(e));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that id' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(user => {
        if (!user) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }
        res.json(user);
    })
    .catch((err) => res.status(500).json(err));
},
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID' })
          : User.updateMany(
            { _id : {$in: userData.friends } },
            { $pull: { friends: params.id } }
          )
      .then(() => {
        Thought.deleteMany (
          { username:  userData.username }
        )
        .then(() => { res.json({ message: 'successfully deleted!' })
      .catch(err => res.status(400).json(err));
      })
      .catch((err) =>  { console.log(err);res.status(400).json(err)});
    })
      .catch(err => { console.log(err);res.status(400).json(err)}));
    },
    addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
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
