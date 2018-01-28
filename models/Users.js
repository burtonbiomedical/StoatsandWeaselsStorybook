const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  socialID: {
    type: String,
    required: true
  },
  emails: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName:{
    type: String 
  },
  image: {
    type: String
  }
});

//Create collection and add schema
mongoose.model('users', UserSchema);