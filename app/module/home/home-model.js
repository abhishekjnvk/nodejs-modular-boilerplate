'use strict';
const serviceLocator = require('../../helpers/service-locator');
const mongoose = serviceLocator.get('mongoose');

const HomeSchema = new mongoose.Schema(
  {
    _id     : { type: String, required: true },
    version : {
      type    : String,
      default : '1.0.0',
    },
    request_id : {
      type    : String,
      default : '',
    },
  },
  {
    timestamps : true,
  },
);

module.exports = mongoose.model('Home', HomeSchema);
