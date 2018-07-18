const { celebrate } = require('celebrate');


exports.validate = schema => celebrate(schema, {
  stripUnknown: { objects: true },
});

exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.clearCookie('connected.sid');
  res.status(401).send({ message: 'Unauthorized' });
};
