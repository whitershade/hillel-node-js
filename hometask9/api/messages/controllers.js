const { pick, omitBy, isEmpty } = require('lodash');

const Model = require('./model');
const normalizeMessageField = require('../../utils/normalizeMessageField');


const filterOptions = ['username-filter', 'message', 'show'];
const sortOptions = ['createdAt', 'username-sort'];

const controllers = {
  getItems: (req, res) => {
    const { query } = req;

    const filter = normalizeMessageField(omitBy(pick(query, filterOptions), isEmpty));
    const sort = normalizeMessageField(omitBy(pick(query, sortOptions), isEmpty));

    const filterByMatch = Object
      .keys(filter)
      .reduce((filters, filterName) => ({
        ...filters,
        [filterName]: { $regex: `${filter[filterName]}`, $options: 'i' },
      }), {});

    Model
      .find(filterByMatch)
      .sort(sort)
      .then((messages) => {
        res.render('pages/messages', { title: 'Messages', messages });
      })
      .catch(e => res.status(400).send(e));
  },

  getItem: (req, res) => {
    Model
      .findById(req.params.id)
      .then((message) => {
        if (!message) return res.status(404).send();

        res.render('pages/message', { title: 'Message', message });
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  },

  createItem: (req, res) => {
    const { username, message, show } = req.body;

    const newMessage = new Model({
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
  },

  renderCreateForm: (req, res) => {
    res.render('pages/messages/add-new-message-form', { title: 'Add new message' });
  },
};


module.exports = { ...controllers };
