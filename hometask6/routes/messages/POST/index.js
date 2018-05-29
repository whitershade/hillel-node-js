const fs = require('fs');

module.exports = (req, res) => {
  const { app: { locals: { dataPath } } } = req;

  const {
    user = '',
    message = '',
    show,
    endAt,
  } = req.body;

  fs.readFile(dataPath, 'utf8', (error, data) => {
    if (error) res.send(error);

    try {
      const messages = JSON.parse(data);
      messages.push({
        addedAt: Date.now(),
        user,
        message,
        show,
        endAt,
      });

      const json = JSON.stringify(messages);
      fs.writeFile(dataPath, json, 'utf8', () => res.redirect('/messages'));
    } catch (e) {
      res.send(error);
    }
  });
};
