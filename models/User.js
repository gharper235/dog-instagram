const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarImg: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Dog_Paw_Print.png'
  },
  posts: [{
    type: mongoose.Types.ObjectId,
    ref: 'Post'
  }],
  following: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }]
},
{
  timestamps: true
});

const User = mongoose.model( 'User', userSchema );

module.exports = User;
