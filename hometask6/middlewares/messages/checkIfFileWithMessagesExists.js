const fs = require('fs');

module.exports = (req, res, next) => {
  const { app: { locals: { dataPath } } } = req;

  fs.exists(dataPath, (exists) => {
    if (!exists) {
      fs.writeFile(dataPath, '', (err) => {
        if (err) return next(err);

        next();
      });
    } else {
      next();
    }
  });
};
