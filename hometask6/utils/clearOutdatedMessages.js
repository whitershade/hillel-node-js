const fs = require('fs');
const path = require('path');

const messagesPath = path.join(__dirname, '..', 'data', 'messages.json');

module.exports = () => {
  setInterval(() => {
    fs.exists(messagesPath, (exists) => {
      if (!exists) return;

      fs.stat(messagesPath, (error, { size }) => {
        if (error || size === 0) return;

        fs.readFile(messagesPath, 'utf8', (error, data) => {
          if (error) return;

          try {
            const messages = JSON.parse(data);
            const filteredMessages = messages.filter(({ endAt }) => endAt >= Number(new Date()));
            const json = JSON.stringify(filteredMessages);

            fs.writeFile(messagesPath, json, 'utf8', () => {});
          } catch (error) {
            global.console.log(error);
          }
        });
      });
    });
  }, 1000);
};
