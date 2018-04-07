const chalk = require('chalk');
const { isUndefined } = require('lodash');
const { DEFAULT_CONSOLE_TEXT_COLOR } = require('../constants');

module.exports = (text, color = DEFAULT_CONSOLE_TEXT_COLOR) => {
  if (isUndefined(text)) throw new Error('first argument should be provided');

  global.console.log(chalk.bold.keyword(color)(text));
};
