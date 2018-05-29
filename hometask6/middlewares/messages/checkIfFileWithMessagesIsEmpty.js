const fs = require('fs');


module.exports = (req, res, next) => {
  const { app: { locals: { dataPath } } } = req;

  fs.stat(dataPath, (error, { size }) => {
    if (error) return next(error);

    if (size === 0) {
      fs.writeFile(dataPath, '[]', 'utf8', (err) => {
        if (err) return next(err);

        next();
      });
    } else {
      next();
    }
  });
};
