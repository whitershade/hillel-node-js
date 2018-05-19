const url = require('url');


const logger = stream => (req, res, next) => {
  const startTime = new Date();
  const { pathname } = url.parse(req.url, true);

  const log = (statusCode) => {
    const endTime = new Date();

    stream.write(`pathname: ${pathname}, start time: ${startTime.toUTCString()}, end time: ${endTime.toUTCString()}, time spent (sec): ${((endTime - startTime) / 1000)}, request type: ${req.method}, status code: ${statusCode}, user agent: ${req.headers['user-agent']}\n`);
  };

  res.on('finish', () => log(res.statusCode)); // successful pipeline (regardless of its response)
  res.on('close', () => log('closed by user')); // aborted pipeline
  res.on('error', e => log(e)); // pipeline internal error

  next();
};


module.exports = logger;
