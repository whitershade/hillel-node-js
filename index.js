const os = require('os');
const yuriiObject = require('./module');
const { world } = require('./getWorld');
const badPractice = require('./badPracticeGlobalExport');

console.log(`Hello, ${ world }`);
console.log(`Current platform: ${ os.platform() }`);
console.log(yuriiObject);
console.log(`console.log of global.badPractice is ${ global.badPractice }`);
