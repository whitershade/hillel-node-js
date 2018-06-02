module.exports = (req, res, next) => {
  if (req.method !== 'POST') return next();

  const { user, message, show } = req.body;

  switch (true) {
    case typeof user !== 'string':
      return res.status(418).json({ message: 'User must be a string' });

    case typeof message !== 'string':
      return res.status(418).json({ message: 'Message must a string' });

    case typeof show !== 'string':
      return res.status(418).json({ message: 'Show must be a string' });

    case user.length === 0:
      return res.status(418).json({ message: 'User must be not empty string' });

    case message.length === 0:
      return res.status(418).json({ message: 'Message must be not empty string' });

    case show.length === 0:
      return res.status(418).json({ message: 'Show must be not empty string' });

    case Number.isNaN(Number(show)):
      return res.status(418).json({ message: 'Show must be a number' });

    case Number(show) < 0:
      return res.status(418).json({ message: 'Show must be >= 0' });

    case Number(show) > 60:
      return res.status(418).json({ message: 'Show must be < 60' });

    default:
      req.body.endAt = Number(new Date()) + (show * 1000);
      next();
  }
};
