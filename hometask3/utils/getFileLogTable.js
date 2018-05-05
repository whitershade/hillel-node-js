const Table = require('easy-table');

let isNewTable = true;

module.exports = (filePath, startTime, endTime, status) => {
  const t = new Table();

  // "18" provides margin between "spent time" and "status" td
  const offset = isNewTable ? 0 : 18;

  t.cell('File', filePath);
  t.cell('Start at', startTime.toUTCString());
  t.cell('Ended at', endTime.toUTCString());
  t.cell('Spent time (sec)', ((endTime - startTime) / 1000).toFixed(2));
  t.cell('Status', status, (val, width) => (width ? Table.padLeft(val, offset) : val));
  t.newRow();

  if (isNewTable) {
    isNewTable = false;
    return `\nServer started: ${new Date().toUTCString()}\n\n${t.toString()}`;
  }

  return t.print();
};
