const Table = require('easy-table');

const t = new Table();

module.exports = (filePath, startTime, endTime, status) => {
  t.cell('File', filePath);
  t.cell('Start at', startTime.toUTCString());
  t.cell('Ended at', endTime.toUTCString());
  t.cell('Spent time (sec)', (endTime - startTime) / 1000);
  t.cell('Status', status);
  t.newRow();

  return t.toString();
};
