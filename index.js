const os = require('os');
const yuriiObject = require('./module');
const { world } = require('./getWorld');

console.log(`Hello, ${ world }`);
console.log(`Current platform: ${ os.platform() }`);
console.log(yuriiObject);
