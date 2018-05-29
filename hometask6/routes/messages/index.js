const express = require('express');
const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '..', '..', 'data', 'messages.json');
const router = express.Router();

const sendError = (res, error) => res.send(error);

router
  .get('/', (req, res) => {
    fs.readFile(messagesPath, 'utf8', (error, data) => {
      if (error) sendError(res, error);

      try {
        const messages = JSON.parse(data);
        res.render('pages/messages/messages', { messages });
      } catch (e) {
        sendError(res, e);
      }
    });
  })
  .get('/new', (req, res) => {
    res.render('pages/messages/add-new-message');
  })
  .get('/json', (req, res) => {
    res.render('pages/messages/json');
  })
  .get('/get-json-messages', (req, res) => {
    fs.readFile(messagesPath, 'utf8', (error, data) => {
      if (error) sendError(res, error);

      res.status(200).send(data);
    });
  })
  .get('/get-json-message', (req, res) => {
    fs.readFile(messagesPath, 'utf8', (error, data) => {
      if (error) sendError(res, error);

      try {
        const { query } = req;
        let messages = JSON.parse(data);

        Object.keys(query).forEach((key) => {
          messages = messages.filter(item => query[key] === '' || item[key] === query[key]);
        });

        const json = JSON.stringify(messages);
        res.status(200).send(json);
      } catch (e) {
        sendError(res, e);
      }
    });
  })
  .post('/', (req, res) => {
    const {
      user = '', message = '', show, endAt,
    } = req.body;

    fs.readFile(messagesPath, 'utf8', (error, data) => {
      if (error) sendError(res, error);

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
        fs.writeFile(messagesPath, json, 'utf8', () => res.redirect('/messages'));
      } catch (e) {
        sendError(res, e);
      }
    });
  });


module.exports = router;
