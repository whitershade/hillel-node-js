const fs = require('fs');

module.exports = (req, res) => {
  fs.readFile(req.app.locals.dataPath, 'utf8', (error, data) => {
    if (error) res.send(error);

    try {
      const messages = JSON.parse(data);
      res.render('pages/messages/messages', { messages });
    } catch (error) {
      res.send(error);
    }
  });
};
