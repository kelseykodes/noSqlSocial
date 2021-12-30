const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
// const Thought = require('./Thought');

const userSchema = new Schema({
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
  },
  //Must look into mongoose's matching validation
  validate: {},

    thoughts: [ {type: Schema.Types.ObjectId, ref: 'Thought'} ],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}]
 },
 //NOT SURE WHY AN ERROR HERE
 {
  toJSON: { virtuals: true, getters: true },
  id: false
}
);

const User = mongoose.model('User', userSchema);


userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema)
module.exports = User














// const userData = [
//   { username: 'kperkins58', email:'kperkins@yahoo.com'},
//   { username: 'rturner32', email: 'rturner@yahoo.com' },
// ];

// User.create(
//   { user: employeeData },
//   (err, data) => {
//     if (err) {
//       console.error(err);
//     }
//     console.log(data);
//   }
// );

// Book.create(
//   {
//     username: 'kperkins',
//     email: 'kperkins@yahoo.com'
//   },
//   (err) => (err ? handleError(err) : console.log('Created new document'))
// );
// Create a virtual property `friendCount` that gets the amount of comments per post