require('./modules/global');
const chalk = require('chalk');
const helloFromExports = require('./modules/moduleExports');
const helloFromModleExports = require('./modules/moduleExports');


global.console.log(global.sayHello());
global.console.log(helloFromExports());
global.console.log(helloFromModleExports());
