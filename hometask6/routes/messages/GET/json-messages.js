const fs = require('fs');

module.exports = (req, res) => {
  fs.readFile(req.app.locals.dataPath, 'utf8', (error, data) => {
    if (error) res.send(error);

    res.status(200).send(data);
  });
};
