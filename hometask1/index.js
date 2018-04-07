require('./modules/global');
const chalk = require('chalk');
const {
  sayHello: sayHelloFromExports,
  sayGoodbye: sayGoodbyeFromExports,
} = require('./modules/exports');
const helloFromExportByDefault = require('./modules/exportByDefault');

const { globalExport, exportByDefault, severalExports } = require('minimist')(process.argv.slice(2));

global.console.log(global.sayHello(globalExport));

global.console.log(helloFromExportByDefault(exportByDefault));

global.console.log(sayHelloFromExports(severalExports));
global.console.log(sayGoodbyeFromExports(severalExports));
