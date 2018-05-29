const fs = require('fs');

module.exports = (req, res) => {
  fs.readFile(req.app.locals.dataPath, 'utf8', (error, data) => {
    if (error) res.send(error);

    try {
      const { query } = req;
      let messages = JSON.parse(data);

      Object.keys(query).forEach((key) => {
        messages = messages.filter(item => query[key] === '' || item[key] === query[key]);
      });

      const json = JSON.stringify(messages);
      res.status(200).send(json);
    } catch (error) {
      res.send(error);
    }
  });
};
