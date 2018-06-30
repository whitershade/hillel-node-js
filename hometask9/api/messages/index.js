const express = require('express');
const Message = require('./model');
const { pick, omitBy, isEmpty } = require('lodash');
const checkStructureOfCreatingMessage = require('./middlewares');

const router = express.Router();

const filterOptions = ['username-filter', 'message', 'show'];
const sortOptions = ['createdAt', 'username-sort'];

const normalize = (object = {}) => { // eslint-disable-line
  return Object.keys(object).reduce((result, fieldName) => {
    const [normalizedFieldName] = fieldName.split('-');

    return { ...result, [normalizedFieldName]: object[fieldName] };
  }, {});
};

module.exports = router
  .get('/', (req, res) => {
    const { query } = req;

    const filter = normalize(omitBy(pick(query, filterOptions), isEmpty));
    const sort = normalize(omitBy(pick(query, sortOptions), isEmpty));

    const filterByMatch = Object
      .keys(filter)
      .reduce((filters, filterName) => ({
        ...filters,
        [filterName]: { $regex: `${filter[filterName]}`, $options: 'i' },
      }), {});

    Message
      .find(filterByMatch)
      .sort(sort)
      .then((messages) => {
        res.render('pages/messages', { title: 'Messages', messages });
      })
      .catch(e => res.status(400).send(e));
  })
  .get('/new', (req, res) => {
    res.render('pages/messages/add-new-message-form', { title: 'Add new message' });
  })

  .get('/:id', (req, res) => {
    Message
      .findById(req.params.id)
      .then((message) => {
        if (!message) return res.status(404).send();

        res.render('pages/message', { title: 'Message', message });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })

  .post('/', checkStructureOfCreatingMessage, (req, res) => {
    const { username, message, show } = req.body;

    const newMessage = new Message({
      username,
      message,
      show,
      endAt: Date.now() + (show * 1000),
    });

    newMessage
      .save()
      .then(() => {
        res.redirect('/');
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  })
  .get('/', (req, res) => {
    res.render('pages/json', { title: 'Get JSON' });
  });
