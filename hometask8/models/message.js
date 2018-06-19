const mongoose = require('../db/mongoose');


const Message = mongoose.model('Message', {
  username: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 512,
    trim: true,
  },
  show: {
    type: Number,
    min: 1,
    max: 60,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: this.show,
  },
});


module.exports = Message;
