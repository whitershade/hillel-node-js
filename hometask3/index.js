const fs = require('fs');
const http = require('http');
const path = require('path');

const getContentType = require('./utils/getContentType');
const getFileLogTable = require('./utils/getFileLogTable');
const RequestLogger = require('./utils/RequestLogger');

const fileName = 'kitten.jpg';
const filePath = path.join(__dirname, fileName);
const fileLogPath = path.join(__dirname, 'logs', 'file.txt');
const requestsLogPath = path.join(__dirname, 'logs', 'requests.txt');

const server = new http.Server();

const requestLogger = new RequestLogger();
const writeFileLogStream = fs.createWriteStream(fileLogPath, { flags: 'a' });
const writeRequestsLogStream = fs.createWriteStream(requestsLogPath, { flags: 'a' });

// support function keeps getFileLogTable arguments that do not changes
const writeTable = (startTime, status) =>
  writeFileLogStream.write(getFileLogTable(fileName, startTime, new Date(), status));

// updating of logs/requests every 1 minute
setInterval(() => {
  writeRequestsLogStream.write(`requests count: ${requestLogger.getRequestsLength()}. ${requestLogger.getPrintableRequests()}\n`);

  requestLogger.clearRequests();
}, 60000);

server.on('request', (req, res) => {
  // log all incoming requests
  requestLogger.addRequest({ method: req.method, status: res.statusCode });

  if (req.method === 'GET' && req.url === '/') {
    const startTime = new Date();

    // highWaterMark needs only for slow down reading of image (pretend that the file is big)
    const readFileStream = fs.createReadStream(filePath, { highWaterMark: 9 });
    readFileStream.pipe(res);

    res.on('finish', () => {
      writeTable(startTime, 'Finish');
      res.writeHead(200, { 'Content-type': getContentType(filePath) });
    });

    res.on('close', () => {
      if (typeof readFileStream.destroy === 'function') readFileStream.destroy();
      writeTable(startTime, 'Closed');
    });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => global.console.log(`Server started on localhost:${PORT}`));
