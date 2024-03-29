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
      required : true,
    },
    email_verified : {
      type    : Boolean,
      default : false,
    },
    password : {
      type     : String,
      required : true,
    },
    date : {
      type    : Number,
      default : Date.now(),
    },
    email_verification_timestamp : {
      type    : Number,
      default : 0,
    },
    password_update_timestamp : {
      type    : Number,
      default : 0,
    },
  },
  {
    timestamps : true,
  },
);

module.exports = mongoose.model('User', HomeSchema);
