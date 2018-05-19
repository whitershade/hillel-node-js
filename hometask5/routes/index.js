const express = require('express');


const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile('index.html');
});

router.get('/images/:image', (req, res, next) => {
  res.sendFile(`/images/${req.params.image}`, next); // it's a stream btw, see https://github.com/pillarjs/send/blob/master/index.js
}, ({ statusCode }, req, res, next) => {
  res.sendStatus(statusCode);
});


module.exports = router;
