'use strict';
const serviceLocator = require('../../helpers/service-locator');
const mongoose = serviceLocator.get('mongoose');

const HomeSchema = new mongoose.Schema(
  {
    _id  : { type: String, required: true },
    name : {
      type : String,
    },
    email : {
      type     : String,
      unique   : true,
      required : true
    },
    password : {
      type     : String,
      required : true
    },
    date : {
      type    : String,
      default : Date.now(),
    },
  },
  {
    timestamps : true,
  }
);


module.exports = mongoose.model('User', HomeSchema);
