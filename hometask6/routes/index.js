const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const folder = path.join(__dirname, '..', 'views', 'assets', 'images');

router.get('/', (req, res) => {
  res.render('pages/home');
});

router.get('/images', (req, res) => {
  fs.readdir(folder, (err, images) => {
    res.render('pages/images', { images });
  });
});

router.get('/images/:image', (req, res) => {
  res.render('pages/image', { image: req.params.image });
});


module.exports = router;
