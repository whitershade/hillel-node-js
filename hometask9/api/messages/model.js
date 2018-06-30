const mongoose = require('../../db/mongoose');


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
    type: Date,
    expires: 0,
    index: -1,
  },
}, { timestamps: true });

MessageSchema.statics = {
  findActiveMessages() {
    return this.find({ show: { $gte: new Date() } });
  },
};

MessageSchema.pre('save', function preSave() {
  if (this.isNew) {
    this.show = new Date(new Date().getTime() + (this.show * 1000));
  }
});


module.exports = mongoose.model('Message', MessageSchema);
