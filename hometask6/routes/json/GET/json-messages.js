const fs = require('fs');
const { orderBy } = require('lodash');


module.exports = (req, res) => {
  const filterOptions = ['user', 'show', 'message'];
  const sortOptions = ['addedAt', 'endAt'];

  fs.readFile(req.app.locals.dataPath, 'utf8', (error, data) => {
    if (error) res.send(error);

    try {
      const { query } = req;
      let messages = JSON.parse(data);

      const { filter: queryFilter, sort: querySort } = Object.keys(query).reduce((accumulator, key) => {
        if (query[key] === '') return accumulator;
        if (filterOptions.includes(key)) { return { ...accumulator, filter: [...accumulator.filter, key] }; }
        if (sortOptions.includes(key)) { return { ...accumulator, sort: [...accumulator.sort, key] }; }

        return accumulator;
      }, { filter: [], sort: [] });

      queryFilter.forEach((key) => {
        messages = messages.filter(item => item[key] === query[key]);
      });

      messages = orderBy(
        messages,
        querySort,
        querySort.map(key => query[key]),
      );

      const json = JSON.stringify(messages);
      res.status(200).send(json);
    } catch (e) {
      res.send(e);
    }
  });
};
