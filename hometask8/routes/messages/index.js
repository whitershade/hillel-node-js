const express = require('express');
const Message = require('../../models/message');
const checkStructureOfCreatingMessage = require('../../middlewares/messages/checkStructureOfCreatingMessage');

const router = express.Router();


module.exports = router
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
  .get('/new', (req, res) => {
    res.render('pages/messages/add-new-message-form', { title: 'Add new message' });
  });
