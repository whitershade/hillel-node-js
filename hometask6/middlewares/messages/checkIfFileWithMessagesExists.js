const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '..', '..', 'data', 'messages.json');


const checkIfFileWithMessagesExists = (req, res, next) => {
  fs.exists(messagesPath, (exists) => {
    if (!exists) {
      fs.writeFile(messagesPath, '', (err) => {
        if (err) return next(err);

        next();
      });
    } else {
      next();
    }
  });
};


module.exports = checkIfFileWithMessagesExists;
