const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '..', '..', 'data', 'messages.json');


const checkIfFileWithMessagesIsEmpty = (req, res, next) => {
  fs.stat(messagesPath, (error, { size }) => {
    if (error) return next(error);

    if (size === 0) {
      fs.writeFile(messagesPath, '[]', 'utf8', (err) => {
        if (err) return next(err);

        next();
      });
    } else {
      next();
    }
  });
};


module.exports = checkIfFileWithMessagesIsEmpty;
