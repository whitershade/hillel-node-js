const { globalExport, exportByDefault, severalExports } = require('minimist')(process.argv.slice(2));
require('./modules/global');
const helloFromExportByDefault = require('./modules/exportByDefault');
const {
  sayHello: sayHelloFromExports,
  sayGoodbye: sayGoodbyeFromExports,
} = require('./modules/exports');

const consoleLog = require('./utils/consoleLog');

consoleLog(global.sayHello(globalExport), 'red');
consoleLog(helloFromExportByDefault(exportByDefault), 'purple');
consoleLog(sayHelloFromExports(severalExports), 'yellow');
consoleLog(sayGoodbyeFromExports(severalExports), 'yellow');
