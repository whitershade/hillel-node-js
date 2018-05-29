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
  .post('/', (req, res) => {
    fs.readFile(messagesPath, 'utf8', (error, data) => {
      if (error) sendError(res, error);

      const { user = '', message = '' } = req.body;

      try {
        const messages = JSON.parse(data);
        messages.push({ addedAt: '1', user, message });

        const json = JSON.stringify(messages);
        fs.writeFile(messagesPath, json, 'utf8', () => res.redirect('/messages'));
      } catch (e) {
        sendError(res, e);
      }
    });
  });


module.exports = router;
