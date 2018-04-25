const fs = require('fs');
const http = require('http');
const path = require('path');

const getContentType = require('./utils/getContentType');
const getFileLogTable = require('./utils/getFileLogTable');

const fileName = 'kitten.jpg';
const filePath = path.join(__dirname, fileName);
const logPath = path.join(__dirname, 'log.txt');
const server = new http.Server();

server.on('request', (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const startTime = new Date();

    const readFileStream = fs.createReadStream(filePath, { highWaterMark: 3 });
    const writeLogStream = fs.createWriteStream(logPath);

    res.writeHead(200, { 'Content-type': getContentType(filePath) });
    readFileStream.pipe(res);

    res.on('finish', () => {
      writeLogStream.write(getFileLogTable(fileName, startTime, new Date(), 'Finish'));
    });

    res.on('close', () => {
      writeLogStream.write(getFileLogTable(fileName, startTime, new Date(), 'Closed'));
      if (typeof readFileStream.destroy === 'function') readFileStream.destroy();
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log('Server started', PORT);
});
