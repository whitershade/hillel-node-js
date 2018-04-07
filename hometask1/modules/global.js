const { NOTHING_TO_SAY } = require('../constants');

global.sayHello = (whatToSay = NOTHING_TO_SAY) => `Hello! Don't use me! ${whatToSay}`;
