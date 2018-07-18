const UsersModel = require('./model').model;

exports.registerNewUser = (req, res) => {
  UsersModel.create(req.body, (err, user) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(400).send({ message: 'email already registered' });
      }
      return res.status(400).send({ message: err.message });
    }

    res.send(user);
  });
};

exports.login = (req, res) => {
  res.json(req.session);
};
