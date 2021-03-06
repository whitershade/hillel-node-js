const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const folder = path.join(__dirname, '..', '..', 'views', 'assets', 'images');


router
  .get('/', (req, res) => {
    fs.readdir(folder, (err, images) => {
      res.render('pages/gallery/', { title: 'Images', images });
    });
  })
  .get('/:image', (req, res) => {
    res.render('pages/gallery/image', { title: 'Image', image: req.params.image });
  });


module.exports = router;
