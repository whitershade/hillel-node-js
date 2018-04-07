const os = require('os');
const yuriiObject = require('./module');
const { world } = require('./getWorld');
require('./badPracticeGlobalExport');

global.console.log(`Hello, ${world}`);
global.console.log(`Current platform: ${os.platform()}`);
global.console.log(yuriiObject);
global.console.log(`console.log of global.badPractice is ${global.badPractice}`);
