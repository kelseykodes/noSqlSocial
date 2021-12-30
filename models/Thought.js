const mongoose = require('mongoose');
const { Schema, model, Types} = require('mongoose');
const moment = require('moment');


const thoughtSchema = new Schema({
  thoughtText:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
 },
  createdAt: {
  type: Date,
  default: Date.now,
  },
  username: {
    type: String,
    required: true
 },
 reactions: [reactionSchema]
},
 {
  toJSON: { virtuals: true },
  id: false
}
);

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        //Use a getter method to format the timestamp on query
        get: createdAtVal => moment(createdAtVal).format('M/D [at] hh:mm a')
    }
},
    {
        toJSON: { getters: true },
        id: false
    }
);

// Create a virtual property `reactionCount` that gets the amount of comments per post
thouhgtSchema.virtual('reactionCount').get(function () 
{
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema)
module.exports = Thought;












// const reactionData = [
//     { reactionId: '', reactionBody:'', username:'kperkins@yahoo.com'},
//     { reactionId: '', reactionBody:'', username:'kperkins@yahoo.com'}
//   ];
  