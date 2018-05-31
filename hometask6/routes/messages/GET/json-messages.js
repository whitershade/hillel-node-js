const { orderBy, sortBy } = require('lodash');
const fs = require('fs');

module.exports = (req, res) => {
  fs.readFile(req.app.locals.dataPath, 'utf8', (error, data) => {
    if (error) res.send(error);

    try {
      const { query } = req;

      let messages = JSON.parse(data);

      const parameters = Object
        .keys(query)
        .filter(key => query[key] !== '');

      messages = orderBy(
        messages,
        parameters,
        parameters.map(key => query[key]),
      );

      const json = JSON.stringify(messages);
      res.status(200).send(json);
    } catch (e) {
      res.send(e);
    }
  });
};
