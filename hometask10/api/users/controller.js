const { pick } = require('lodash');
const UsersModel = require('./model').model;

exports.registerNewUser = (req, res) => {
  UsersModel.create(req.body, (err) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(400).send({ message: 'email already registered' });
      }
      return res.status(400).send({ message: err.message });
    }

    return res.sendStatus(200);
  });
};

exports.login = (req, res) => {
  res.status(200).send(pick(req.user, ['_id', 'email']));
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.sendStatus(200);
};

exports.showMe = (req, res) => {
  res.status(200).send(req.user);
};
