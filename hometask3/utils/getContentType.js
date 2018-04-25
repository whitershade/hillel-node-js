const fileType = require('file-type');
const readChunk = require('read-chunk');

module.exports = (filePath) => {
  const buffer = readChunk.sync(filePath, 0, 4100);
  const { mime } = fileType(buffer);

  return mime;
};
