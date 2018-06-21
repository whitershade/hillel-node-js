const mongoose = require('../db/mongoose');


const { Schema } = mongoose;

const MessageSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    trim: true,
    validate: {
      validator(username) {
        return /^[A-Za-z]*$/.test(username);
      },
      message: 'username must use only symbols from latin alphabet',
    },
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
  endAt: {
    type: Date,
    required: true,
    expires: 0,
  },
}, { timestamps: true });


module.exports = mongoose.model('Message', MessageSchema);
