const { NOTHING_TO_SAY } = require('../constants');

exports.sayHello = (whatToSay = NOTHING_TO_SAY) => `Hello! ${whatToSay}`;
exports.sayGoodbye = (whatToSay = NOTHING_TO_SAY) => `Goodbye! ${whatToSay}`;
