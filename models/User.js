const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
// const Thought = require('./Thought');

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true
 },
  email: {
  type: String,
  required: true,
  unique: true,
  //Must look into mongoose's matching validation
  validate: {},
    thoughts: [ {type: Schema.Types.ObjectId, ref: 'Thought'} ],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
 },
 //NOT SURE WHY AN ERROR HERE
 {
  toJSON: { virtuals: true },
  id: false
}
);

// Create a virtual property `friendCount` that gets the amount of comments per post
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema)
module.exports = User