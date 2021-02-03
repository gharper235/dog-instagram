const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  img: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  // user: {
  //   type: mongoose.Types.ObjectId,
  //   ref: 'User'
  // },
  // likes: [{
  //   type: mongoose.Types.ObjectId,
  //   ref: 'User'
  // }]
},
{
  timestamps: true
});


const Post = mongoose.model('Post', postSchema )

module.exports = Post;