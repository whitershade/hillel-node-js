const fs = require('fs');
const url = require('url');
const http = require('http');
const path = require('path');
const fileType = require('file-type');

const server = new http.Server();
const writeRequestsLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'requests.txt'), { flags: 'a' });

const messages = [];

server.on('request', (req, res) => {
  const { pathname } = url.parse(req.url, true);
  const startTime = new Date();

  const log = (statusCode) => {
    const endTime = new Date();

    writeRequestsLogStream.write(`pathname: ${pathname}, start time: ${startTime.toUTCString()}, end time: ${endTime.toUTCString()}, time spent (sec): ${((endTime - startTime) / 1000)}, request type: ${req.method}, status code: ${statusCode}, user agent: ${req.headers['user-agent']}\n`);
  };

  res.on('close', () => log('closed by user'));
  const returnNotFoundMessage = () => {
    res.writeHead(404);
    res.end('Not found');
    res.on('finish', () => log(404));
  };
  const returnNotCorrectType = () => {
    res.writeHead(400);
    res.end('Not correct content-type');
    res.on('finish', () => log(400));
  };
  const returnJson = (object) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(object));
    res.on('finish', () => log(200));
  };

  switch (req.method) {
    case 'GET':
      switch (true) {
        case pathname === '/':
          fs
            .createReadStream(path.join(__dirname, 'index.html'))
            .pipe(res);

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
          break;

        case pathname === '/favicon.ico':
          fs
            .createReadStream(path.join(__dirname, 'favicon.png'))
            .pipe(res);

          res.on('finish', () => log(200));
          break;

        case pathname.match(/^\/images\/.+/) !== null: {
          const image = pathname.split('/')[2];

          const readFileStream = fs
            .createReadStream(path.join(__dirname, 'images', image), { highWaterMark: 4100 })
            .once('data', chunk => res.setHeader('Content-Type', fileType(chunk).mime))
            .on('open', () => {
              res.on('close', () => {
                if (typeof readFileStream.destroy === 'function') readFileStream.destroy();
              });
            })
            .on('error', () => returnNotFoundMessage())
            .pipe(res);

          res.on('finish', () => log(200));
          break;
        }

        case pathname === '/messages':
          returnJson({ messages });

          break;

        case pathname.match(/^\/messages\/(\d+)/) !== null: {
          const id = pathname.split('/')[2];

          let messageNum = Number(id);
          if (isNaN(messageNum)) return returnNotFoundMessage();

          messageNum -= 1;
          if (messageNum >= messages.length) return returnNotFoundMessage();

          returnJson({ message: messages[messageNum] });
          break;
        }
        default:
          returnNotFoundMessage();
      }
      break;

    case 'POST':
      switch (true) {
        case req.headers['content-type'] !== 'application/json':
          returnNotCorrectType();
          break;

        case pathname === '/messages': {
          let data = '';
          req.on('data', (chunk) => { data += chunk; });
          req.on('end', () => {
            const obj = JSON.parse(data);
            messages.push({ ...obj, _id: messages.length });
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Message added successful', _id: messages.length }));
          });

          res.on('finish', () => log(200));
          break;
        }

        default: returnNotFoundMessage();
      }
      break;

    default: returnNotFoundMessage();
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => global.console.log(`Server started at localhost:${PORT}`));
