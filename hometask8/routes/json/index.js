const { pick, omitBy, isEmpty } = require('lodash');
const express = require('express');
const Message = require('../../models/message');


const router = express.Router();

const filterOptions = ['username', 'message', 'show'];
const sortOptions = ['createdAt', 'endAt'];

module.exports = router
  .get('/', (req, res) => {
    res.render('pages/json', { title: 'Get JSON' });
  })

  .get('/get-json', (req, res) => {
    const { query } = req;

    const filter = omitBy(pick(query, filterOptions), isEmpty);
    const sort = omitBy(pick(query, sortOptions), isEmpty);

    Message
      .find(filter)
      .sort(sort)
      .then(doc => res.status(200).send(JSON.stringify(doc)))
      .catch(e => res.status(523).send(e));
  });
