const mongoose = require('../../db/mongoose');
const bcrypt = require('bcryptjs');


const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  timestamps: true,
  collection: 'UsersCollection',
});

UsersSchema.statics = {
  checkUser(email, password, next) {
    this
      .findOne({ email })
      .select('email password')
      .lean()
      .exec((err, user) => {
        if (err) return next({ message: err.message });

        if (!user) return next({ message: 'email is not correct' });

        const compare = bcrypt.compareSync(password, user.password);

        if (compare) {
          next(false, user);
        } else {
          next({ message: 'password is not correct' });
        }
      });
  },

  serializeUser(user, next) {
    next(false, user._id.toString());
  },

  deserializeUser(id, next) {
    this
      .findById(id)
      .select('email')
      .lean()
      .exec((err, user) => {
        if (err) return next({ message: err.message });

        if (!user) return next({ message: 'email is not correct' });

        next(false, user);
      });
  },
};

UsersSchema.pre('save', function userPreSave(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
});

const model = mongoose.model('UserModel', UsersSchema);

module.exports = {
  model,
  schema: UsersSchema,
};
