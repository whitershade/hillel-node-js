const { NOTHING_TO_SAY } = require('../constants');

module.exports = (whatToSay = NOTHING_TO_SAY) => `Hello! ${whatToSay}`;
