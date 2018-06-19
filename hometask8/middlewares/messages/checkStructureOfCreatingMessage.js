module.exports = (req, res, next) => {
  if (req.method !== 'POST') return next();

  const { username, message, show } = req.body;

  switch (true) {
    case typeof username !== 'string':
      return res.status(418).json({ message: 'Usernamename must be a string' });

    case typeof message !== 'string':
      return res.status(418).json({ message: 'Message must a string' });

    case typeof show !== 'string':
      return res.status(418).json({ message: 'Show must be a string' });

    case username.length < 3:
      return res.status(418).json({ message: 'Username must has at least 3 symbols' });

    case message.length < 1:
      return res.status(418).json({ message: 'Message must has at least 1 symbol' });

    case message.length > 512:
      return res.status(418).json({ message: 'Message mush has less than 512 symbols' });

    case show.length === 0:
      return res.status(418).json({ message: 'Show must be not empty string' });

    case Number.isNaN(Number(show)):
      return res.status(418).json({ message: 'Show must be a number' });

    case !Number.isInteger(Number(show)):
      return res.status(418).json({ message: 'Show must be an integer number' });

    case Number(show) < 1:
      return res.status(418).json({ message: 'Show must be >= 1' });

    case Number(show) > 60:
      return res.status(418).json({ message: 'Show must be < 60' });

    default:
      next();
  }
};
