const { forEach } = require('lodash');


if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const env = process.env.NODE_ENV;

if (env === 'development' || env === 'test') {
  const config = require('./config.json');

  const envConfig = config[env];

  forEach(envConfig, (item, key) => {
    process.env[key] = envConfig[key];
  });
}
